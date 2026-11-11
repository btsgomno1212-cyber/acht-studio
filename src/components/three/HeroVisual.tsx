"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import type { SceneRegion, SplitState } from "./HeroScene";
import { HeroPoster } from "./HeroPoster";

// Three.js wird erst im Browser und getrennt vom restlichen Code geladen.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Support = "pending" | "webgl" | "none";

let cachedSupport: Support | null = null;

function detectWebGL(): Support {
  if (cachedSupport) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cachedSupport = context ? "webgl" : "none";
  } catch {
    cachedSupport = "none";
  }
  return cachedSupport;
}

const subscribeNever = () => () => {};

/** Fängt Fehler der 3D-Szene ab und zeigt stattdessen das Standbild. */
class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type HeroVisualProps = {
  wire: string;
  render: string;
  hint: string;
};

export function HeroVisual({ wire, render, hint }: HeroVisualProps) {
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const support = useSyncExternalStore<Support>(
    subscribeNever,
    detectWebGL,
    () => "pending",
  );
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const region = useRef<SceneRegion | null>(null);

  // Freien Bereich über der Überschrift ausmessen (für schmale Bildschirme).
  useEffect(() => {
    const element = container.current;
    const hero = element?.parentElement;
    const title = hero?.querySelector<HTMLElement>("[data-hero-title]");
    if (!element || !hero || !title) return;

    const measure = () => {
      const box = element.getBoundingClientRect();
      const titleBox = title.getBoundingClientRect();
      const navOffset = Math.min(96, box.height * 0.12);
      region.current = {
        top: navOffset,
        bottom: Math.max(navOffset + 120, titleBox.top - box.top - 44),
      };
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  // Rendern pausieren, sobald der Hero nicht sichtbar ist oder der Tab im Hintergrund liegt.
  useEffect(() => {
    const element = container.current;
    if (!element) return;

    let onScreen = true;
    const update = () => setActive(onScreen && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        update();
      },
      { rootMargin: "80px" },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const handleSplit = useCallback((state: SplitState) => {
    const element = line.current;
    if (!element) return;
    element.style.transform = `translate3d(${state.x}px, ${state.top}px, 0)`;
    element.style.height = `${state.height}px`;
    element.style.opacity = state.strength.toFixed(3);
  }, []);

  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div
      ref={container}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {/* Weiches Umgebungslicht hinter den Formen */}
      <div className="absolute top-[6%] right-[-8%] h-[72%] w-[78%] rounded-full bg-[radial-gradient(closest-side,rgb(255_226_61/0.085),transparent)] max-lg:top-[-4%] max-lg:right-[-20%] max-lg:h-[58%] max-lg:w-[140%]" />
      <div className="absolute top-[30%] right-[-14%] h-[60%] w-[46%] rounded-full bg-[radial-gradient(closest-side,rgb(77_134_255/0.09),transparent)] max-lg:hidden" />

      {support === "none" ? (
        <HeroPoster />
      ) : support === "webgl" ? (
        <SceneBoundary fallback={<HeroPoster />}>
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-expo",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <HeroScene
              active={active}
              reduceMotion={reduceMotion}
              region={region}
              onSplit={handleSplit}
              onReady={handleReady}
            />
          </div>

          {/* Trennlinie zwischen Drahtgitter und Render */}
          <div
            ref={line}
            className="absolute top-0 left-0 w-px bg-[linear-gradient(to_bottom,transparent,var(--color-neon)_16%,var(--color-neon))] opacity-0 will-change-transform"
          >
            <span className="absolute top-full right-3 mt-1 text-[0.8125rem] leading-none whitespace-nowrap text-mute">
              {wire}
            </span>
            <span className="absolute top-full left-3 mt-1 text-[0.8125rem] leading-none whitespace-nowrap text-paper">
              {render}
            </span>
          </div>
        </SceneBoundary>
      ) : null}

      <p
        className={cn(
          "absolute right-[clamp(1.25rem,4.5vw,4.5rem)] bottom-10 hidden text-[0.8125rem] text-faint transition-opacity duration-1000 sm:bottom-14",
          ready && support === "webgl"
            ? "opacity-100 [@media(hover:hover)_and_(min-width:1024px)]:block"
            : "opacity-0",
        )}
      >
        {hint}
      </p>
    </div>
  );
}
