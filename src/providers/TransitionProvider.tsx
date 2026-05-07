import type { PropsWithChildren } from "react";
import { SVGPageTransition } from "@/components/motion/SVGPageTransition";

export function TransitionProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <SVGPageTransition />
    </>
  );
}
