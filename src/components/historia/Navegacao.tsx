"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Ceus from "./Ceus";
import { NOMES, useCapitulo } from "./capitulo";

export default function Navegacao() {
  const n = useCapitulo();
  // fora da página principal o texto rola por baixo da navegação: aí leva um fundo escuro a desvanecer
  const comFundo = usePathname() !== "/";
  return (
    <header className={comFundo ? "nav nav-fundo" : "nav"}>
      <Link href="/" className="nav-nome" aria-label="Yuri Dagot, início">
        <span key={n} className="nav-nome-troca">{NOMES[n]}</span>
      </Link>
      <Ceus />
      <Link href="/#fala" className="nav-fala">Fala comigo</Link>
    </header>
  );
}
