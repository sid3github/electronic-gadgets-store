import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "default" | "narrow" | "wide";
};

const sizeClass = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({ size = "default", className = "", ...rest }: ContainerProps) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${sizeClass[size]} ${className}`} {...rest} />;
}
