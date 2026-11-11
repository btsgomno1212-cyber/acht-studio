"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { InquiryProvider } from "@/components/form/InquiryContext";
import { SmoothScroll } from "./SmoothScroll";
import { UiTextProvider, type UiText } from "./UiText";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({
  children,
  text,
}: {
  children: ReactNode;
  text: UiText;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <SmoothScroll />
        <UiTextProvider value={text}>
          <InquiryProvider>{children}</InquiryProvider>
        </UiTextProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
