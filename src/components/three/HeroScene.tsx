"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Hero-Szene: Kugel, Würfel und Kegel – die drei Grundformen – umkreist von
 * einem Neonring. Links von der Trennlinie erscheinen die Formen als
 * Drahtgitter, rechts davon fertig gerendert. Die Linie folgt dem Zeiger.
 *
 * Technik: Jede Form existiert zweimal (Flächen + Kanten). Zwei Clipping-
 * Ebenen, die durch die Kamera verlaufen, schneiden jeweils eine Hälfte weg.
 * Auf dem Bildschirm ergibt das eine exakt senkrechte Trennlinie.
 */

export type SplitState = {
  /** Position der Trennlinie in CSS-Pixeln ab linkem Rand der Zeichenfläche */
  x: number;
  /** Oberkante und Höhe der Linie in CSS-Pixeln */
  top: number;
  height: number;
  /** 0 = Linie unsichtbar (liegt außerhalb der Formen), 1 = voll sichtbar */
  strength: number;
};

/** Freier Bereich für die Formen auf schmalen Bildschirmen (CSS-Pixel ab Oberkante). */
export type SceneRegion = { top: number; bottom: number };

type HeroSceneProps = {
  active: boolean;
  reduceMotion: boolean;
  region: { current: SceneRegion | null };
  onSplit: (state: SplitState) => void;
  onReady: () => void;
};

const NEON = "#ffe23d";
const RIM = "#4d86ff";
const INK = "#080808";

/** Radius, in den die Komposition (ohne Skalierung) hineinpasst. */
const COMPOSITION_RADIUS = 2.25;

/**
 * Ebenen (Layers):
 *   0 – gerenderte Flächen (Hauptkamera und Spiegelung)
 *   1 – Drahtgitter (nur Hauptkamera)
 *   2 – Studio-Lichtflächen (nur in der Spiegelung der Chromkugel sichtbar)
 */
const LAYER_WIRE = 1;
const LAYER_STUDIO = 2;

export default function HeroScene({
  active,
  reduceMotion,
  region,
  onSplit,
  onReady,
}: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 30, position: [0, 0, 10], near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ pointerEvents: "none" }}
    >
      <StudioEnvironment />
      <Composition
        reduceMotion={reduceMotion}
        region={region}
        onSplit={onSplit}
        onReady={onReady}
      />
    </Canvas>
  );
}

/* -------------------------------------------------------------------------
   Licht: eine kleine "Studio-Umgebung" aus leuchtenden Flächen, einmalig in
   eine Reflexions-Map gerechnet. Kein externes HDR-Bild nötig.
   ------------------------------------------------------------------------- */
function StudioEnvironment() {
  const getState = useThree((state) => state.get);

  useEffect(() => {
    const { gl, scene } = getState();
    const disposables: Array<{ dispose: () => void }> = [];
    const panels = new THREE.Group();

    const panel = (
      color: string,
      intensity: number,
      position: [number, number, number],
      size: [number, number],
    ) => {
      const geometry = new THREE.PlaneGeometry(size[0], size[1]);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.lookAt(0, 0, 0);
      mesh.layers.set(LAYER_STUDIO);
      panels.add(mesh);
      disposables.push(geometry, material);
    };

    // Hauptlicht: große Softbox oben links vorne
    panel("#ffffff", 4.2, [-5.5, 6.5, 6], [6, 4.5]);
    // Breites, schwaches Oberlicht gibt den Formen Volumen
    panel("#ffffff", 0.9, [0, 10, -1], [16, 10]);
    // Schmale Streifen für lange Glanzlichter
    panel("#ffffff", 8, [7.5, 1.5, 5], [0.55, 8]);
    panel("#ffffff", 3.2, [-8.5, -1.5, 2.5], [0.4, 6]);
    // Kühles Kantenlicht von hinten rechts
    panel(RIM, 7, [7, 3.5, -6.5], [6, 6]);
    // Warmer Schein von unten links, passend zum Neonring
    panel(NEON, 1.6, [-6, -5.5, -2], [6, 3]);

    // 1) Einmalig als Reflexions-Map für alle Materialien rechnen …
    const studio = new THREE.Scene();
    studio.background = new THREE.Color("#030303");
    studio.add(panels);
    panels.traverse((object) => object.layers.enable(0));
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(studio, 0.03);
    scene.environment = target.texture;

    // 2) … und danach in die echte Szene hängen, sichtbar nur für die Spiegelung.
    panels.traverse((object) => object.layers.set(LAYER_STUDIO));
    scene.add(panels);

    return () => {
      scene.environment = null;
      scene.remove(panels);
      target.dispose();
      pmrem.dispose();
      disposables.forEach((item) => item.dispose());
    };
  }, [getState]);

  return null;
}

/* -------------------------------------------------------------------------
   Geometrie
   ------------------------------------------------------------------------- */

/** Rasterlinien eines unterteilten Würfels – ohne die Diagonalen der Dreiecke. */
function boxGridLines(size: number, divisions: number) {
  const half = size / 2;
  const step = size / divisions;
  const points: number[] = [];
  const axes: Array<[number, number, number]> = [
    [0, 1, 2],
    [1, 2, 0],
    [2, 0, 1],
  ];

  for (const [u, v, w] of axes) {
    for (const side of [-half, half]) {
      for (let i = 0; i <= divisions; i += 1) {
        const offset = -half + i * step;
        const a = [0, 0, 0];
        const b = [0, 0, 0];
        a[w] = side;
        b[w] = side;
        // Linie entlang v
        a[u] = offset;
        b[u] = offset;
        a[v] = -half;
        b[v] = half;
        points.push(a[0], a[1], a[2], b[0], b[1], b[2]);
        // Linie entlang u
        a[v] = offset;
        b[v] = offset;
        a[u] = -half;
        b[u] = half;
        points.push(a[0], a[1], a[2], b[0], b[1], b[2]);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points, 3),
  );
  return geometry;
}

function circleLine(radius: number, segments: number) {
  const points: number[] = [];
  for (let i = 0; i < segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    const b = ((i + 1) / segments) * Math.PI * 2;
    points.push(
      Math.cos(a) * radius,
      Math.sin(a) * radius,
      0,
      Math.cos(b) * radius,
      Math.sin(b) * radius,
      0,
    );
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points, 3),
  );
  return geometry;
}

const CUBE = 1.26;

function createAssets(detail: "high" | "low") {
  const hi = detail === "high";
  const renderPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  const wirePlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);

  // --- Flächen (gerenderte Seite)
  const sphere = new THREE.SphereGeometry(1.05, hi ? 96 : 56, hi ? 64 : 36);
  const cube = new RoundedBoxGeometry(CUBE, CUBE, CUBE, hi ? 6 : 4, 0.075);
  const cone = new THREE.ConeGeometry(0.76, 1.62, hi ? 96 : 56, 1);
  const tube = new THREE.TorusGeometry(2.08, 0.019, 10, hi ? 220 : 140);
  const glowInner = new THREE.TorusGeometry(2.08, 0.075, 16, 140);
  const glowOuter = new THREE.TorusGeometry(2.08, 0.34, 16, 140);

  // --- Kanten (Drahtgitter-Seite): bewusst grober aufgelöst
  const sphereLow = new THREE.SphereGeometry(1.05, 24, 14);
  const cubeLow = new THREE.BoxGeometry(CUBE, CUBE, CUBE);
  const coneLow = new THREE.ConeGeometry(0.76, 1.62, 20, 4);
  const sphereEdges = new THREE.EdgesGeometry(sphereLow, 1);
  const cubeEdges = boxGridLines(CUBE, 4);
  const coneEdges = new THREE.EdgesGeometry(coneLow, 1);
  const ringEdges = circleLine(2.08, 160);

  // --- Materialien
  // Die Kugel spiegelt die echte Szene (siehe Reflexionskamera unten).
  const reflection = new THREE.WebGLCubeRenderTarget(hi ? 256 : 128, {
    type: THREE.HalfFloatType,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  const chrome = new THREE.MeshStandardMaterial({
    color: "#ffffff",
    metalness: 1,
    roughness: 0.045,
    envMap: reflection.texture,
    envMapIntensity: 1.1,
    clippingPlanes: [renderPlane],
  });
  const graphite = new THREE.MeshStandardMaterial({
    color: "#202020",
    metalness: 0.92,
    roughness: 0.34,
    envMapIntensity: 1.55,
    clippingPlanes: [renderPlane],
  });
  const ceramic = new THREE.MeshStandardMaterial({
    color: "#ebebeb",
    metalness: 0,
    roughness: 0.44,
    envMapIntensity: 0.9,
    clippingPlanes: [renderPlane],
  });
  const neon = new THREE.MeshBasicMaterial({
    color: new THREE.Color(NEON).multiplyScalar(2.4),
    toneMapped: false,
    clippingPlanes: [renderPlane],
  });
  // Lichthof um die Neonröhre: zur Mitte hell, zum Rand weich auslaufend.
  const glow = (strength: number, power: number) =>
    new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(NEON) },
        uStrength: { value: strength },
        uPower: { value: power },
      },
      vertexShader: /* glsl */ `
        #include <common>
        #include <clipping_planes_pars_vertex>
        varying vec3 vViewNormal;
        void main() {
          #include <begin_vertex>
          #include <project_vertex>
          #include <clipping_planes_vertex>
          vViewNormal = normalize(normalMatrix * normal);
        }
      `,
      fragmentShader: /* glsl */ `
        #include <common>
        #include <clipping_planes_pars_fragment>
        uniform vec3 uColor;
        uniform float uStrength;
        uniform float uPower;
        varying vec3 vViewNormal;
        void main() {
          #include <clipping_planes_fragment>
          float facing = clamp(abs(normalize(vViewNormal).z), 0.0, 1.0);
          float alpha = pow(facing, uPower) * uStrength;
          gl_FragColor = vec4(uColor * alpha, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
      clipping: true,
      clippingPlanes: [renderPlane],
    });
  const glowA = glow(0.95, 1.25);
  const glowB = glow(0.3, 2.2);

  const line = new THREE.LineBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.62,
    toneMapped: false,
    clippingPlanes: [wirePlane],
  });
  // Deckt verdeckte Kanten ab, damit das Drahtgitter nicht "durchsichtig" wirkt.
  const occluder = new THREE.MeshBasicMaterial({
    color: INK,
    toneMapped: false,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
    clippingPlanes: [wirePlane],
  });

  const all = [
    sphere,
    cube,
    cone,
    tube,
    glowInner,
    glowOuter,
    sphereLow,
    cubeLow,
    coneLow,
    sphereEdges,
    cubeEdges,
    coneEdges,
    ringEdges,
    chrome,
    graphite,
    ceramic,
    neon,
    glowA,
    glowB,
    line,
    occluder,
    reflection,
  ];

  return {
    renderPlane,
    wirePlane,
    geometry: {
      sphere,
      cube,
      cone,
      tube,
      glowInner,
      glowOuter,
      sphereLow,
      cubeLow,
      coneLow,
      sphereEdges,
      cubeEdges,
      coneEdges,
      ringEdges,
    },
    material: { chrome, graphite, ceramic, neon, glowA, glowB, line, occluder },
    reflection,
    dispose: () => all.forEach((item) => item.dispose()),
  };
}

/* -------------------------------------------------------------------------
   Komposition und Animation
   ------------------------------------------------------------------------- */

const SPHERE_POS: [number, number, number] = [0.66, 0.14, 0];
const CUBE_POS: [number, number, number] = [-0.98, -0.92, 0.5];
const CONE_POS: [number, number, number] = [-0.7, 1.2, -0.55];

type CompositionProps = Pick<
  HeroSceneProps,
  "reduceMotion" | "region" | "onSplit" | "onReady"
>;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function Composition({
  reduceMotion,
  region,
  onSplit,
  onReady,
}: CompositionProps) {
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const lowPower = size.width < 768;
  const assets = useMemo(
    () => createAssets(lowPower ? "low" : "high"),
    [lowPower],
  );
  useEffect(() => () => assets.dispose(), [assets]);

  // Kamera, die aus der Kugelmitte heraus die Szene für die Spiegelung aufnimmt.
  const mirror = useMemo(() => {
    const cubeCamera = new THREE.CubeCamera(0.1, 40, assets.reflection);
    cubeCamera.layers.enable(LAYER_STUDIO);
    return cubeCamera;
  }, [assets]);

  useEffect(() => {
    camera.layers.enable(LAYER_WIRE);
  }, [camera]);

  const root = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Group>(null);
  const sphereMesh = useRef<THREE.Mesh>(null);
  const cube = useRef<THREE.Group>(null);
  const cone = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);

  // Zeigerposition (in Fensterkoordinaten) – ohne React-State, damit nichts neu rendert.
  const pointer = useRef({ x: 0, y: 0, active: false, moved: false });
  const split = useRef<number | null>(null);
  const clock = useRef(0);
  const frame = useRef(0);
  const ready = useRef(false);
  const scratch = useMemo(
    () => ({
      center: new THREE.Vector3(),
      ray: new THREE.Vector3(),
      up: new THREE.Vector3(),
      normal: new THREE.Vector3(),
    }),
    [],
  );

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.active = true;
      pointer.current.moved = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useFrame((state, rawDelta) => {
    const group = root.current;
    if (!group) return;

    const delta = Math.min(rawDelta, 0.1);
    clock.current += delta;
    frame.current += 1;
    const t = clock.current;
    const { viewport, gl, scene } = state;
    const rect = gl.domElement.getBoundingClientRect();
    const wide = size.width >= 900 && size.width > size.height;

    /* --- Platzierung: rechts auf breiten Bildschirmen, oben mittig auf schmalen */
    const scroll = clamp(window.scrollY / Math.max(size.height, 1), 0, 1.2);
    let fit: number;
    let baseX: number;
    let baseY: number;
    if (wide) {
      fit = Math.min(viewport.height * 0.74, viewport.width * 0.46);
      baseX = viewport.width * 0.235;
      baseY = viewport.height * 0.055;
    } else {
      // Schmal: die Formen füllen den freien Bereich zwischen Navigation und Überschrift.
      const area = region.current ?? {
        top: rect.height * 0.1,
        bottom: rect.height * 0.45,
      };
      const areaHeight =
        ((area.bottom - area.top) / rect.height) * viewport.height;
      const areaCenter = (area.top + area.bottom) / 2 / rect.height;
      fit = Math.min(viewport.width * 0.9, areaHeight * 0.98);
      baseX = 0;
      baseY = (0.5 - areaCenter) * viewport.height;
    }
    const scale = fit / (COMPOSITION_RADIUS * 2);

    group.scale.setScalar(scale);
    group.position.set(baseX, baseY - scroll * viewport.height * 0.16, 0);

    /* --- Zeiger: Komposition dreht sich leicht mit */
    const px = pointer.current.active
      ? ((pointer.current.x - rect.left) / rect.width) * 2 - 1
      : 0;
    const py = pointer.current.active
      ? -(((pointer.current.y - rect.top) / rect.height) * 2 - 1)
      : 0;
    const follow = 1 - Math.exp(-delta * 2.2);
    const drift = reduceMotion ? 0 : Math.sin(t * 0.22) * 0.16;
    const targetY = clamp(px, -1, 1) * 0.2 + drift + scroll * 0.5;
    const targetX = -clamp(py, -1, 1) * 0.1 + 0.06;
    group.rotation.y += (targetY - group.rotation.y) * follow;
    group.rotation.x += (targetX - group.rotation.x) * follow;

    /* --- Eigenbewegung der Formen */
    if (!reduceMotion) {
      if (sphere.current) {
        sphere.current.position.y = SPHERE_POS[1] + Math.sin(t * 0.7) * 0.05;
      }
      if (cube.current) {
        cube.current.position.y = CUBE_POS[1] + Math.sin(t * 0.55 + 1.7) * 0.06;
        cube.current.rotation.y += delta * 0.11;
        cube.current.rotation.x += delta * 0.045;
      }
      if (cone.current) {
        cone.current.position.y =
          CONE_POS[1] + Math.sin(t * 0.62 + 3.1) * 0.055;
        cone.current.rotation.z = 0.3 + Math.sin(t * 0.4) * 0.06;
      }
      if (ring.current) {
        ring.current.rotation.z += delta * 0.07;
        ring.current.rotation.x = 1.2 + Math.sin(t * 0.3) * 0.07;
      }
    }

    /* --- Spiegelung der Chromkugel: die Szene aus der Kugelmitte aufnehmen.
           Nicht in jedem Bild nötig – die Formen bewegen sich langsam. */
    const every = lowPower ? 5 : 2;
    if (sphere.current && sphereMesh.current && frame.current % every === 1) {
      group.updateMatrixWorld();
      sphere.current.getWorldPosition(mirror.position);
      sphereMesh.current.visible = false;
      gl.localClippingEnabled = false;
      mirror.update(gl, scene);
      gl.localClippingEnabled = true;
      sphereMesh.current.visible = true;
    }

    /* --- Trennlinie: Grenzen der Komposition in Bildschirmkoordinaten (NDC) */
    scratch.center.copy(group.position).project(camera);
    const halfWidth =
      (COMPOSITION_RADIUS * scale * 1.04) / (viewport.width / 2);
    const halfHeight = (COMPOSITION_RADIUS * scale) / (viewport.height / 2);
    const left = scratch.center.x - halfWidth;
    const right = scratch.center.x + halfWidth;

    const INTRO_DELAY = 0.35;
    const INTRO_DURATION = reduceMotion ? 0 : 2.1;
    const introProgress =
      INTRO_DURATION === 0
        ? 1
        : clamp((t - INTRO_DELAY) / INTRO_DURATION, 0, 1);

    let target: number;
    if (introProgress < 1) {
      // Auftakt: alles Drahtgitter, dann wandert die Linie nach links – das Bild "rendert".
      target = right + (left - right) * easeInOut(introProgress);
    } else if (pointer.current.moved && pointer.current.active) {
      target = clamp(px, left, right);
    } else if (reduceMotion) {
      target = left + (right - left) * 0.5;
    } else {
      // Ohne Zeiger (Touch): Linie pendelt langsam über die Formen.
      const phase = (t - INTRO_DELAY - INTRO_DURATION) * 0.42;
      target = left + (right - left) * (0.5 - 0.5 * Math.cos(phase)) * 0.78;
    }

    if (split.current === null) split.current = right;
    const ease = introProgress < 1 ? 1 : 1 - Math.exp(-delta * 7.5);
    split.current += (target - split.current) * ease;
    const s = split.current;

    // Ebene durch Kamera und Trennlinie: rechts davon wird gerendert, links Drahtgitter.
    scratch.ray
      .set(s, 0, 0.5)
      .unproject(camera)
      .sub(camera.position)
      .normalize();
    scratch.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
    scratch.normal.crossVectors(scratch.ray, scratch.up).normalize();
    assets.renderPlane.setFromNormalAndCoplanarPoint(
      scratch.normal,
      camera.position,
    );
    assets.wirePlane.setFromNormalAndCoplanarPoint(
      scratch.normal.negate(),
      camera.position,
    );

    const edge = halfWidth * 0.1;
    onSplit({
      x: (s * 0.5 + 0.5) * rect.width,
      top: (1 - (scratch.center.y + halfHeight)) * 0.5 * rect.height,
      height: halfHeight * rect.height,
      strength:
        smoothstep(left, left + edge, s) *
        (1 - smoothstep(right - edge, right, s)),
    });

    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });

  const { geometry, material } = assets;

  return (
    <>
      <primitive object={mirror} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[-4, 5, 7]} intensity={2.4} />
      <directionalLight position={[6, 2.5, -5]} intensity={2.8} color={RIM} />

      <group ref={root}>
        {/* Kugel */}
        <group ref={sphere} position={SPHERE_POS}>
          <mesh
            ref={sphereMesh}
            geometry={geometry.sphere}
            material={material.chrome}
          />
          <mesh
            geometry={geometry.sphereLow}
            material={material.occluder}
            layers={LAYER_WIRE}
          />
          <lineSegments
            geometry={geometry.sphereEdges}
            material={material.line}
            layers={LAYER_WIRE}
          />
        </group>

        {/* Würfel */}
        <group ref={cube} position={CUBE_POS} rotation={[0.48, 0.62, 0.1]}>
          <mesh geometry={geometry.cube} material={material.graphite} />
          <mesh
            geometry={geometry.cubeLow}
            material={material.occluder}
            layers={LAYER_WIRE}
          />
          <lineSegments
            geometry={geometry.cubeEdges}
            material={material.line}
            layers={LAYER_WIRE}
          />
        </group>

        {/* Kegel */}
        <group ref={cone} position={CONE_POS} rotation={[0.24, 0.3, 0.3]}>
          <mesh geometry={geometry.cone} material={material.ceramic} />
          <mesh
            geometry={geometry.coneLow}
            material={material.occluder}
            layers={LAYER_WIRE}
          />
          <lineSegments
            geometry={geometry.coneEdges}
            material={material.line}
            layers={LAYER_WIRE}
          />
        </group>

        {/* Neonring */}
        <group
          ref={ring}
          position={[0.05, 0.05, 0]}
          rotation={[1.2, 0.22, 0.4]}
        >
          <mesh geometry={geometry.tube} material={material.neon} />
          <mesh geometry={geometry.glowInner} material={material.glowA} />
          <mesh geometry={geometry.glowOuter} material={material.glowB} />
          <lineSegments
            geometry={geometry.ringEdges}
            material={material.line}
            layers={LAYER_WIRE}
          />
          <pointLight
            position={[2.08, 0, 0]}
            color={NEON}
            intensity={9}
            distance={7}
            decay={2}
          />
          <pointLight
            position={[-1.04, 1.8, 0]}
            color={NEON}
            intensity={9}
            distance={7}
            decay={2}
          />
          <pointLight
            position={[-1.04, -1.8, 0]}
            color={NEON}
            intensity={9}
            distance={7}
            decay={2}
          />
        </group>
      </group>
    </>
  );
}
