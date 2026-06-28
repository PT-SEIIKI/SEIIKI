import Image from "next/image";
import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <Image 
      src="/logo.png" 
      alt="SEIIKI - PT. Solusi Energi Kelistrikan Indonesia" 
      width={140} 
      height={48}
      className={props.className || "w-auto h-10"}
      priority
      unoptimized={true} 
    />
  );
}
