"use client";

import Link from "next/link";
import Ceus from "./Ceus";
import { NOMES, useCapitulo } from "./capitulo";

export default function Navegacao() {
  const n = useCapitulo();
  return (
    <header className="nav">
      <Link href="/" className="nav-nome" aria-label="Yuri Dagot, início">
        <span key={n} className="nav-nome-troca">{NOMES[n]}</span>
      </Link>
      <Ceus />
      <Link href="/#fala" className="nav-fala">Fala comigo</Link>
    </header>
  );
}
