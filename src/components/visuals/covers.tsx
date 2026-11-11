import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import lampRender from "@/assets/lamp-render.webp";
import lampWire from "@/assets/lamp-wire.webp";
import monoStill from "@/assets/mono.webp";
import nuvraStill from "@/assets/nuvra.webp";
import type { ProjectId } from "@/content/projects";
import type { ServiceId } from "@/content/services";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { ArvenSite } from "./ArvenSite";
import { KardoBrand, VelaBrand } from "./Brands";
import { KardoMark } from "./KardoMark";
import { KontorDashboard } from "./KontorDashboard";
import { LumoSite } from "./LumoSite";
import { Slot } from "./primitives";
import { RunaPlan, RunaRoute, RunaScreen, type RunaLabels } from "./RunaScreen";

/*
 * Titelbilder der Konzeptprojekte und Illustrationen der Leistungen.
 *
 * Jede Komposition füllt ihre Kachel vollständig (absolute inset-0). Die
 * Kachel selbst muss `relative`, `overflow-hidden` und `container-type: size`
 * tragen – dafür gibt es die Klasse `stage` (siehe globals.css).
 *
 * Eigenes Projekt ergänzen: Bild nach src/assets legen und in `ProjectCover`
 * einen Fall mit <ImageCover src={…} /> hinzufügen.
 */

type Visuals = Dictionary["visuals"];

/** Bildbreiten für next/image: Kacheln sind höchstens gut halb so breit wie das Fenster. */
const SIZES = "(min-width: 1024px) 62vw, 94vw";

/** Browserfenster, das am unteren Rand der Kachel angeschnitten ist. */
function BrowserStage({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center">
      <div className="@container h-[80cqh] w-[min(88cqw,170cqh)]">
        {children}
      </div>
    </div>
  );
}

/** Drei Bildschirme der Lauf-App, gefächert und unten angeschnitten. */
function PhoneStage({ labels }: { labels: RunaLabels }) {
  const phone = "w-[min(27cqw,47cqh)] shrink-0";
  return (
    <div className="absolute inset-0 flex items-start justify-center gap-[min(3.4cqw,6cqh)] pt-[20cqh]">
      <RunaRoute labels={labels} className={`${phone} mt-[9cqh]`} />
      <RunaScreen labels={labels} className={phone} />
      <RunaPlan labels={labels} className={`${phone} mt-[9cqh]`} />
    </div>
  );
}

/** Foto oder Rendering als Titelbild: erst Platzhalter, dann das Bild. */
export function ImageCover({
  src,
  position = "center",
}: {
  src: StaticImageData;
  position?: string;
}) {
  return (
    <div className="absolute inset-0">
      <Slot image className="size-full">
        <div className="relative size-full">
          <Image
            src={src}
            alt=""
            fill
            sizes={SIZES}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </div>
      </Slot>
    </div>
  );
}

/** Leuchte "Mono": Drahtgitter und Rendering liegen deckungsgleich übereinander. */
function LampStage() {
  return (
    <div className="absolute inset-0">
      <Image
        src={lampWire}
        alt=""
        fill
        sizes={SIZES}
        className="object-cover transition-opacity duration-500 ease-expo lit:opacity-0"
      />
      <Image
        src={lampRender}
        alt=""
        fill
        sizes={SIZES}
        className="object-cover opacity-0 transition-opacity duration-1000 ease-expo lit:opacity-100"
      />
    </div>
  );
}

/** Bildmarke "Kardo" mit Konstruktionslinien. */
function MarkStage() {
  return (
    <div className="absolute inset-0 grid place-items-center transition-colors duration-700 ease-expo lit:bg-[#2a1a12]">
      <div className="absolute inset-0 bg-[radial-gradient(70cqmin_circle_at_30%_20%,rgb(255_196_130/0.2),transparent)] opacity-0 transition-opacity duration-1000 ease-expo lit:opacity-100" />
      <KardoMark className="relative h-[80cqh] w-auto max-w-[82cqw]" />
    </div>
  );
}

export function ProjectCover({
  id,
  visuals,
}: {
  id: ProjectId;
  visuals: Visuals;
}) {
  switch (id) {
    case "lumo":
      return (
        <BrowserStage>
          <LumoSite labels={visuals.lumo} />
        </BrowserStage>
      );
    case "arven":
      return (
        <BrowserStage>
          <ArvenSite labels={visuals.arven} />
        </BrowserStage>
      );
    case "kontor":
      return (
        <BrowserStage>
          <KontorDashboard labels={visuals.kontor} />
        </BrowserStage>
      );
    case "runa":
      return <PhoneStage labels={visuals.runa} />;
    case "nuvra":
      return <ImageCover src={nuvraStill} position="50% 55%" />;
    case "mono":
      return <ImageCover src={monoStill} position="58% 50%" />;
    case "kardo":
      return <KardoBrand labels={visuals.kardo} />;
    case "vela":
      return <VelaBrand labels={visuals.vela} />;
  }
}

export function ServiceVisual({
  id,
  visuals,
}: {
  id: ServiceId;
  visuals: Visuals;
}) {
  switch (id) {
    case "web":
      return (
        <BrowserStage>
          <ArvenSite labels={visuals.arven} />
        </BrowserStage>
      );
    case "3d":
      return <LampStage />;
    case "graphic":
      return <MarkStage />;
    case "uiux":
      return <PhoneStage labels={visuals.runa} />;
  }
}
