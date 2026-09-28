"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects, type Project } from "@/data/projects";
import { anunciarCapitulo } from "./capitulo";

// Primeiro o que está no ar, depois o resto, e as propostas no fim.
const ordem = (p: Project) => (p.liveUrl ? 0 : p.estado === "Proposta" ? 2 : 1);
const lista = [...projects].sort((a, b) => ordem(a) - ordem(b));

export default function Ecra() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current!;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && anunciarCapitulo(3), { threshold: 0.2 });
    obs.observe(el);
    if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) return () => obs.disconnect();

    // Carril: a secção prende-se e desliza de lado; a altura acompanha o que há mesmo para deslizar.
    el.classList.add("mexe");
    const pista = el.querySelector<HTMLElement>(".ecra-pista")!;
    const carril = el.querySelector<HTMLElement>(".ecra-carril")!;
    let distancia = 0, raf = 0, alvo = 0, mostrado = 0;
    const medir = () => {
      distancia = Math.max(0, carril.scrollWidth - innerWidth);
      pista.style.height = `${innerHeight + distancia * 1.25}px`;
    };
    const ro = new ResizeObserver(medir);
    ro.observe(carril);
    medir();
    const aoScroll = () => {
      const r = pista.getBoundingClientRect();
      alvo = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
    };
    addEventListener("scroll", aoScroll, { passive: true });
    aoScroll();
    mostrado = alvo;
    const laco = () => {
      mostrado += (alvo - mostrado) * 0.12;
      // o carril chega ao fim aos 86% e segura, para dar tempo de ler o último
      carril.style.transform = `translate3d(${-Math.min(1, mostrado / 0.86) * distancia}px,0,0)`;
      raf = requestAnimationFrame(laco);
    };
    raf = requestAnimationFrame(laco);
    return () => {
      obs.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", aoScroll);
    };
  }, []);

  return (
    <section ref={raiz} id="projectos" className="ecra" aria-labelledby="ecra-titulo">
      <div className="ecra-pista">
        <div className="ecra-palco">
          <div className="ecra-cabeca">
            <span className="ecra-lugar">Lisboa · desde 2025</span>
            <h2 id="ecra-titulo">
              E agora construo as coisas que eu próprio precisava<span className="ecra-cursor" aria-hidden="true" />
            </h2>
            <p>
              Sempre gostei de informática. Em 2025 voltei ao código e a AI deixou-me fazer sozinho o que antes pedia uma equipa: apps na App Store, sites para
              clientes e ferramentas para quem vive da noite.
            </p>
          </div>
          <ol className="ecra-carril">
            {lista.map((p) => (
              <li key={p.slug} className="projecto">
                <span className="projecto-meta">
                  {p.type} · {p.year}
                  {p.estado && <em>{p.estado}</em>}
                </span>
                <h3>{p.title}</h3>
                <p>{p.resumo}</p>
                <div className="projecto-links">
                  <Link href={`/projects/${p.slug}`}>Ver o projecto</Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visitar o site
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
