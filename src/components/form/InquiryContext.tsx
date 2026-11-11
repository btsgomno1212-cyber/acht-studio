"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PackageId } from "@/content/pricing";
import type { ServiceId } from "@/content/services";

/** Vorauswahl, die z. B. ein Preispaket an das Anfrageformular übergibt. */
export type InquiryPreset = {
  service: ServiceId;
  pkg?: PackageId;
  /** Zähler, damit dieselbe Auswahl erneut übernommen werden kann. */
  stamp: number;
};

type InquiryContextValue = {
  preset: InquiryPreset | null;
  choose: (service: ServiceId, pkg?: PackageId) => void;
  clear: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<InquiryPreset | null>(null);
  const counter = useRef(0);

  const choose = useCallback((service: ServiceId, pkg?: PackageId) => {
    counter.current += 1;
    setPreset({ service, pkg, stamp: counter.current });
  }, []);

  const clear = useCallback(() => setPreset(null), []);

  const value = useMemo(
    () => ({ preset, choose, clear }),
    [preset, choose, clear],
  );

  return (
    <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry muss innerhalb von <InquiryProvider> stehen.");
  }
  return context;
}
