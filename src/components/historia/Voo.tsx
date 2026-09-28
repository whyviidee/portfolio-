"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { anunciarCapitulo } from "./capitulo";

type Foto = { src: string; alt: string; legenda: string; w: number; h: number };
type Paragem = { capitulo: number; lugar: string; titulo: React.ReactNode; texto: string; fotos: Foto[]; fundo: string };

const PARAGENS: Paragem[] = [
  {
    capitulo: 0,
    lugar: "Maputo · 1996 a 2014",
    titulo: "Cresci à beira do Índico.",
    texto:
      "Na Escola Portuguesa de Moçambique era guarda-redes da equipa de futsal que foi campeã da cidade em 2012, e secretário da associação de estudantes. Aos 15 anos o meu irmão chegou da Cidade do Cabo com um controlador de DJ, e eu nunca mais o larguei.",
    fotos: [{ src: "/fotos/maputo-piscina.webp", alt: "O Yuri em criança, dentro de uma piscina em Maputo", legenda: "Maputo, em criança", w: 1800, h: 1645 }],
    fundo: "/voo/paragem-1.webp",
  },
  {
    capitulo: 1,
    lugar: "Lisboa · 2014",
    titulo: "Vim estudar. Fiquei a tocar.",
    texto:
      "Entrei em Engenharia Informática no Técnico. Uma festa Erasmus deu numa residência semanal e passei a ser WhyViiDee, das minhas iniciais: Y, V, D. Na ESN Lisboa fui RP e o DJ de todas as festas.",
    fotos: [{ src: "/fotos/setup-2018.webp", alt: "O Yuri a sorrir atrás do primeiro setup de DJ, em casa, com um flamingo insuflável", legenda: "O primeiro setup em casa, 2018", w: 1400, h: 1400 }],
    fundo: "/voo/paragem-2.webp",
  },
  {
    capitulo: 2,
    lugar: "Cais do Sodré · desde 2020",
    titulo: (
      <>
        Em 2020 escolhi a pista.
        <span>Era onde era mais feliz.</span>
      </>
    ),
    texto:
      "Hoje sou o Dagô. Toco nas festas da GRVVE e nos espectáculos da New Sheet, abri o concerto do Danny Ocean no Coliseu e toquei no palco BacanaPlay do Rock in Rio 2026. Em 2022 estava na equipa de DJs da ESN Sea Battle, o cruzeiro que bateu três recordes do Guinness.",
    fotos: [
      { src: "/fotos/rock-in-rio-cabine.webp", alt: "O Yuri a tocar na cabine, iluminado a vermelho", legenda: "Rock in Rio Lisboa, 2026", w: 1200, h: 1800 },
      { src: "/fotos/rock-in-rio-palco.webp", alt: "O palco BacanaPlay cheio de gente no Rock in Rio", legenda: "Palco BacanaPlay", w: 2200, h: 1467 },
    ],
    fundo: "/voo/paragem-3.webp",
  },
];

// Onde o voo está (0 a 1 do vídeo) para cada ponto do scroll (0 a 1 da pista): voa, pára numa paragem, volta a voar.
const TRAJECTO: [number, number][] = [[0, 0], [0.06, 0], [0.16, 0.08], [0.31, 0.08], [0.46, 0.55], [0.61, 0.55], [0.8, 1], [1, 1]];
// a última janela passa do fim de propósito: a paragem 3 sai inteira, a rolar com o palco
const JANELAS: [number, number][] = [[0.15, 0.32], [0.45, 0.62], [0.79, 1.2]];

const suave = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const passo = (a: number, b: number, x: number) => Math.min(1, Math.max(0, (x - a) / (b - a)));

function tempoDoVideo(p: number) {
  for (let i = 1; i < TRAJECTO.length; i++) {
    const [p0, t0] = TRAJECTO[i - 1], [p1, t1] = TRAJECTO[i];
    if (p <= p1) return t0 + (t1 - t0) * suave(passo(p0, p1, p));
  }
  return 1;
}

function caminhoDaOnda(forca: number, t: number) {
  let d = "M0 60";
  for (let x = 0; x <= 1000; x += 8) {
    const env = Math.sin(x * 0.011 + 0.6) ** 2 * Math.sin(x * 0.0037 + 1.3) ** 2;
    d += ` L${x} ${(60 + forca * 52 * env * Math.sin(x * 0.19 + t * 9)).toFixed(1)}`;
  }
  return d;
}

export default function Voo() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current!;
    const paragens = [...el.querySelectorAll<HTMLElement>(".paragem")];
    const linha = el.querySelector<SVGSVGElement>(".voo-linha")!;
    const onda = linha.querySelector("path")!;
    const ecraGrande = () => innerWidth >= 1000 && innerHeight >= 800;
    const mexe = matchMedia("(prefers-reduced-motion: no-preference)").matches;

    if (!mexe) {
      // Sem movimento: páginas paradas, e o nome muda à medida que cada paragem aparece.
      onda.setAttribute("d", caminhoDaOnda(0, 0));
      const obs = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && anunciarCapitulo(Number((e.target as HTMLElement).dataset.capitulo))),
        { threshold: 0.5 }
      );
      paragens.forEach((p) => obs.observe(p));
      return () => obs.disconnect();
    }

    el.classList.add("mexe");
    const movel = innerWidth < 700;
    const pasta = movel ? "/voo/m" : "/voo/d";
    const TOTAL = movel ? 133 : 213;
    const tela = el.querySelector<HTMLCanvasElement>(".voo-tela")!;
    const ctx = tela.getContext("2d")!;
    const pista = el.querySelector<HTMLElement>(".voo-pista")!;
    const abre = el.querySelector<HTMLElement>(".voo-abre")!;
    const frames: HTMLImageElement[] = new Array(TOTAL);
    const url = (i: number) => `${pasta}/f_${String(i + 1).padStart(4, "0")}.webp`;
    const carregar = (i: number) => {
      if (i < 0 || i >= TOTAL || frames[i]) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = url(i);
      frames[i] = img;
    };
    for (let i = 0; i < TOTAL; i += 8) carregar(i); // um esqueleto primeiro, para o scroll rápido ter sempre imagem
    let k = 0;
    const encher = () => {
      for (let n = 0; n < 10 && k < TOTAL; n++, k++) carregar(k);
      if (k < TOTAL) timer = window.setTimeout(encher, 60);
    };
    let timer = window.setTimeout(encher, 300);

    const ajustar = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      tela.width = innerWidth * dpr;
      tela.height = innerHeight * dpr;
      ultimo = -1;
    };
    let ultimo = -1;
    ajustar();
    addEventListener("resize", ajustar);

    const pronta = (img?: HTMLImageElement) => !!img && img.complete && img.naturalWidth > 0;
    const desenhar = (i: number) => {
      let img = frames[i];
      if (!pronta(img)) {
        for (let d = 1; d < TOTAL && !pronta(img); d++) img = pronta(frames[i - d]) ? frames[i - d] : frames[i + d];
      }
      if (!pronta(img)) return false;
      const W = tela.width, H = tela.height, r = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * r, h = img.naturalHeight * r;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      return img === frames[i];
    };

    let alvo = 0, mostrado = 0, capitulo = -1, raf = 0;
    const progresso = () => {
      const r = pista.getBoundingClientRect();
      return Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    };
    const aoScroll = () => { alvo = progresso(); };
    addEventListener("scroll", aoScroll, { passive: true });
    alvo = mostrado = progresso();

    const laco = (t: number) => {
      mostrado += (alvo - mostrado) * 0.11;
      const i = Math.round(tempoDoVideo(mostrado) * (TOTAL - 1));
      if (i !== ultimo && desenhar(i)) ultimo = i;

      const saida = suave(passo(0.02, 0.1, mostrado));
      abre.style.opacity = String(1 - saida);
      abre.style.transform = `translateY(${-28 * saida}px)`;

      let activa = mostrado < 0.38 ? 0 : mostrado < 0.7 ? 1 : 2;
      let tapa = 0;
      paragens.forEach((p, n) => {
        const [a, b] = JANELAS[n];
        const v = suave(passo(a, a + 0.03, mostrado)) * (1 - suave(passo(b - 0.03, b, mostrado)));
        p.style.opacity = String(v);
        p.style.transform = `translateY(${(1 - v) * 24}px)`;
        p.style.pointerEvents = v > 0.5 ? "auto" : "none";
        // o fio recua quando há texto por cima dele; na última paragem, em ecrã grande, o texto fica acima da onda
        if (n < 2 || !ecraGrande()) tapa = Math.max(tapa, v);
      });
      linha.style.opacity = String(1 - 0.7 * tapa);
      if (progresso() >= 1 && pista.getBoundingClientRect().bottom < innerHeight * 0.4) activa = 3;
      if (activa !== capitulo) { capitulo = activa; anunciarCapitulo(activa); }

      onda.setAttribute("d", caminhoDaOnda(suave(passo(0.74, 0.86, mostrado)), t / 1000));
      raf = requestAnimationFrame(laco);
    };
    raf = requestAnimationFrame(laco);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      removeEventListener("scroll", aoScroll);
      removeEventListener("resize", ajustar);
    };
  }, []);

  return (
    <section ref={raiz} className="voo" aria-label="Da Marginal de Maputo ao Cais do Sodré">
      <div className="voo-pista">
        <div className="voo-palco">
          <div className="voo-inicio" style={{ backgroundImage: "url(/voo/inicio.webp)" }} aria-hidden="true" />
          <canvas className="voo-tela" aria-hidden="true" />
          <svg className="voo-linha" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 60 L1000 60" />
          </svg>
          <div className="voo-abre">
            <h1>
              Sou de Maputo.<span>Vivo em Lisboa.</span>
            </h1>
            <p>Passei a vida a juntar pessoas, na pista e nas festas que criei. Agora construo as coisas que eu próprio precisava.</p>
            <span className="voo-sitio">Marginal, Maputo</span>
          </div>
          {PARAGENS.map((p, n) => (
            <article key={n} className={`paragem paragem-${n + 1}`} data-capitulo={p.capitulo} style={{ "--fundo": `url(${p.fundo})` } as React.CSSProperties}>
              <div className="paragem-texto">
                <span className="paragem-lugar">{p.lugar}</span>
                <h2>{p.titulo}</h2>
                <p>{p.texto}</p>
              </div>
              <div className="paragem-fotos">
                {p.fotos.map((f) => (
                  <figure key={f.src}>
                    <Image src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="(max-width: 700px) 62vw, 34vw" />
                    <figcaption>{f.legenda}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
