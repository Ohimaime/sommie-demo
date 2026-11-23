"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** Fills its positioned parent. Falls back to a warm-sand monogram if the photo is missing. */
export default function Portrait({ sizes, preload, className = "" }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-sand" role="img" aria-label="Sommie">
        <div className="text-center">
          <span className="font-display text-[88px] font-medium italic leading-none text-gold">S</span>
          <span className="mx-auto mt-3 block h-px w-10 bg-gold/60" />
        </div>
      </div>
    );
  }

  return (
    <Image
      src="/sommie.jpg"
      alt="Portrait of Sommie"
      fill
      sizes={sizes}
      preload={preload}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
