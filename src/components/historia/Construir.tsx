"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { anunciarCapitulo } from "./capitulo";

// Três projectos contados, um de cada tipo (o meu negócio, um cliente, um produto meu), com o produto real a correr.
// Os outros ficam num índice simples.
const CONTADOS = [
  {
    slug: "djs-para-eventos",
    video: "djsparaeventos",
    dominio: "djsparaeventos.pt",
    quem: "O meu negócio",
    historia:
      "Uma agência de DJs para casamentos e eventos, com o João Nero. Juntámos DJs de confiança numa carteira fechada e eu construí o resto: o site onde se pede proposta, o escritório onde gerimos cada pedido e a app onde os DJs acompanham as festas, na App Store desde Setembro.",
  },
  {
    slug: "ika-dogwear",
    video: "ika",
    dominio: "ikadogwear.com",
    quem: "Para um cliente",
    historia:
      "Uma marca portuguesa de coleiras e trelas feitas à mão queria uma loja à altura do trabalho, sem pagar as taxas do Shopify. Fiz a loja e um painel onde a marca edita os textos e acompanha as encomendas.",
  },
  {
    slug: "library-dj",
    video: "librarydj",
    dominio: "librarydj.me",
    quem: "Um produto meu",
    historia:
      "Tinha mais de 16 mil faixas desarrumadas e nenhuma ferramenta que as arrumasse como eu queria. Fiz a app: lê a biblioteca, encontra as repetidas, sugere géneros e cria crates. Vende-se em librarydj.me.",
  },
];

const destaque = CONTADOS.map((c) => ({ ...c, projecto: projects.find((p) => p.slug === c.slug)! }));
const indice = projects.filter((p) => !CONTADOS.some((c) => c.slug === p.slug));

export default function Construir() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current!;
    const capitulo = new IntersectionObserver(([e]) => e.isIntersecting && anunciarCapitulo(3), { rootMargin: "0px 0px -50% 0px" });
    capitulo.observe(el);
    // cada vídeo só corre quando está à vista
    const videos = new IntersectionObserver((es) =>
      es.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }),
      { threshold: 0.25 }
    );
    el.querySelectorAll("video").forEach((v) => videos.observe(v));
    return () => {
      capitulo.disconnect();
      videos.disconnect();
    };
  }, []);

  return (
    <section ref={raiz} id="projectos" className="construir" aria-label="O que construo">
      {destaque.map((c, n) => (
        <article key={c.slug} className="contado">
          <div className="contado-texto">
            <span className="contado-quem">
              {String(n + 1).padStart(2, "0")} · {c.quem}
            </span>
            <h3>{c.projecto.title}</h3>
            <p>{c.historia}</p>
            <div className="contado-links">
              {c.projecto.liveUrl && (
                <a href={c.projecto.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visitar o site
                </a>
              )}
              <Link href={`/projects/${c.slug}`}>Como foi feito</Link>
            </div>
          </div>
          <figure className="navegador">
            <span className="navegador-barra">{c.dominio}</span>
            <video src={`/projectos/${c.video}.mp4`} poster={`/projectos/${c.video}.jpg`} muted loop playsInline preload="none" aria-label={`${c.projecto.title} a correr, página inicial a rolar`} />
          </figure>
        </article>
      ))}

      <div className="indice">
        <h3>Mais coisas que fiz</h3>
        <ol>
          {indice.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`}>
                <span className="indice-nome">{p.title}</span>
                <span className="indice-tipo">
                  {p.type}
                  {p.estado && ` · ${p.estado}`}
                </span>
                <span className="indice-ano">{p.year}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
