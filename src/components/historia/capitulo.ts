"use client";

import { useEffect, useState } from "react";

// O nome muda com o capítulo da vida: o voo e o ecrã anunciam, a navegação ouve.
export const NOMES = ["dagotinho", "WhyViiDee", "Dagô", "Yuri Dagot"] as const;
const EVENTO = "capitulo";

export function anunciarCapitulo(n: number) {
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: n }));
}

export function useCapitulo(inicial = NOMES.length - 1) {
  const [n, setN] = useState(inicial);
  useEffect(() => {
    const ouvir = (e: Event) => setN((e as CustomEvent<number>).detail);
    window.addEventListener(EVENTO, ouvir);
    return () => window.removeEventListener(EVENTO, ouvir);
  }, []);
  return n;
}
