"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { anunciarCapitulo } from "./capitulo";

type Foto = { src: string; alt: string; legenda: string; w: number; h: number };
type Paragem = { lugar: string; titulo: React.ReactNode; texto: string; fotos: Foto[]; fundo: string };

const PARAGENS: Paragem[] = [
  {
    lugar: "Maputo · 1996 a 2014",
    titulo: "Cresci à beira do Índico.",
    texto:
      "Na Escola Portuguesa de Moçambique era guarda-redes da equipa de futsal que foi campeã da cidade em 2012, e fazia parte da associação de estudantes. Tinha 15 anos quando o meu irmão chegou da Cidade do Cabo com um controlador de DJ, e nunca mais o larguei.",
    fotos: [{ src: "/fotos/maputo-piscina.webp", alt: "O Yuri em criança, dentro de uma piscina em Maputo", legenda: "Maputo, em criança", w: 1715, h: 1645 }],
    fundo: "/voo/paragem-1.webp",
  },
  {
    lugar: "Lisboa · 2014",
    titulo: "Vim estudar. Fiquei a tocar.",
    texto:
      "Entrei em Engenharia Informática. Uma festa Erasmus deu numa residência semanal, a tocar como WhyViiDee, o nome que já trazia de Maputo, feito das minhas iniciais: Y, V, D. Na ESN Lisboa fui RP e o DJ de todas as festas.",
    fotos: [{ src: "/fotos/setup-2018.webp", alt: "O Yuri a sorrir atrás do setup de DJ, em casa, com um flamingo insuflável", legenda: "O setup em casa, 2018", w: 1400, h: 1400 }],
    fundo: "/voo/paragem-2.webp",
  },
  {
    lugar: "Cais do Sodré · desde 2020",
    titulo: (
      <>
        Em 2020 escolhi a pista.{" "}
        <span>É lá que sou mais feliz.</span>
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

export default function Voo() {
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = raiz.current!;
    const paragens = [...el.querySelectorAll<HTMLElement>(".paragem")];
    const abre = el.querySelector<HTMLElement>(".voo-abre")!;
    // O voo anda sempre com o scroll, mesmo com as animações do sistema desligadas: é quem visita que o conduz.
    // (Sem JavaScript, as páginas paradas do HTML continuam a contar a história.)
    el.classList.add("mexe");
    const movel = innerWidth < 700;
    const pasta = movel ? "/voo/m" : "/voo/d";
    const TOTAL = movel ? 133 : 213;
    const tela = el.querySelector<HTMLCanvasElement>(".voo-tela")!;
    const ctx = tela.getContext("2d")!;
    const pista = el.querySelector<HTMLElement>(".voo-pista")!;
    const frames: HTMLImageElement[] = new Array(TOTAL);
    const prontas = new Set<HTMLImageElement>(); // só entra aqui depois de descodificada: desenhá-la já não engasga
    const url = (i: number) => `${pasta}/f_${String(i + 1).padStart(4, "0")}.webp`;
    const carregar = (i: number) => {
      if (i < 0 || i >= TOTAL || frames[i]) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = url(i);
      img.decode().then(() => prontas.add(img), () => {});
      frames[i] = img;
    };
    for (let i = 0; i < TOTAL; i += 8) carregar(i); // um esqueleto primeiro, para o scroll rápido ter sempre imagem
    let k = 0;
    const encher = () => {
      for (let n = 0; n < 10 && k < TOTAL; n++, k++) carregar(k);
      if (k < TOTAL) timer = window.setTimeout(encher, 60);
    };
    let timer = window.setTimeout(encher, 300);

    const pronta = (img?: HTMLImageElement): img is HTMLImageElement => !!img && prontas.has(img);
    const pintar = (img: HTMLImageElement, alfa: number) => {
      const W = tela.width, H = tela.height, r = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * r, h = img.naturalHeight * r;
      ctx.globalAlpha = alfa;
      ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
    };
    // f é a posição no vídeo em frames, com casas decimais: entre dois frames funde-se um no outro,
    // para o scroll lento não andar aos saltos (o vídeo tem poucos frames por segundo)
    const desenhar = (f: number) => {
      const i = Math.floor(f), a = f - i, A = frames[i], B = frames[Math.min(i + 1, TOTAL - 1)];
      if (pronta(A) && pronta(B)) {
        pintar(A, 1);
        if (a > 0.02) pintar(B, a);
        ctx.globalAlpha = 1;
        return true;
      }
      const j = Math.round(f);
      for (let d = 0; d < TOTAL; d++) {
        const perto = pronta(frames[j - d]) ? frames[j - d] : frames[j + d];
        if (pronta(perto)) { pintar(perto, 1); break; }
      }
      ctx.globalAlpha = 1;
      return false;
    };

    // As medidas lêem-se no scroll e no resize, nunca dentro do laço: ler o layout depois de mexer em estilos engasga o browser
    let alvo = 0, mostrado = 0, fim = false, capitulo = -1, raf = 0, visivel = true, antes = 0, ultimo = -1, exacto = false;
    const aoScroll = () => {
      const r = pista.getBoundingClientRect();
      alvo = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      fim = alvo >= 1 && r.bottom < innerHeight * 0.4;
    };
    const ajustar = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      tela.width = innerWidth * dpr;
      tela.height = innerHeight * dpr;
      exacto = false;
      aoScroll();
    };
    ajustar();
    addEventListener("resize", ajustar);
    addEventListener("scroll", aoScroll, { passive: true });
    mostrado = alvo;

    const laco = (t: number) => {
      // amortecimento medido em tempo, não em frames: igual a 60 Hz e a 144 Hz
      const dt = antes ? Math.min(0.05, (t - antes) / 1000) : 1 / 60;
      antes = t;
      mostrado += (alvo - mostrado) * (1 - Math.exp(-dt / 0.13));
      if (Math.abs(alvo - mostrado) < 1e-5) mostrado = alvo;
      const f = tempoDoVideo(mostrado) * (TOTAL - 1);
      if (!exacto || Math.abs(f - ultimo) > 0.003) { exacto = desenhar(f); ultimo = f; }

      const saida = suave(passo(0.02, 0.1, mostrado));
      abre.style.opacity = String(1 - saida);
      abre.style.transform = `translateY(${-28 * saida}px)`;

      let activa = mostrado < 0.38 ? 0 : mostrado < 0.7 ? 1 : 2;
      paragens.forEach((p, n) => {
        const [a, b] = JANELAS[n];
        const v = suave(passo(a, a + 0.03, mostrado)) * (1 - suave(passo(b - 0.03, b, mostrado)));
        p.style.opacity = String(v);
        p.style.transform = `translateY(${(1 - v) * 24}px)`;
        p.style.pointerEvents = v > 0.5 ? "auto" : "none";
      });
      if (fim) activa = 3;
      if (activa !== capitulo) { capitulo = activa; anunciarCapitulo(activa); }
      raf = visivel ? requestAnimationFrame(laco) : 0;
    };
    raf = requestAnimationFrame(laco);
    // fora do ecrã o laço pára, e volta quando a secção reaparece
    const vista = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel && !raf) { antes = 0; raf = requestAnimationFrame(laco); }
    });
    vista.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      vista.disconnect();
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
          <div className="voo-abre">
            <h1>
              Sou de Maputo.{" "}
              <span>Vivo em Lisboa.</span>
            </h1>
            <p>Passei a vida a juntar pessoas, na pista e nas festas que criei. Agora construo as coisas de que eu próprio precisava.</p>
            <span className="voo-sitio">Marginal, Maputo</span>
          </div>
          {PARAGENS.map((p, n) => (
            <article key={n} className={`paragem paragem-${n + 1}`} style={{ "--fundo": `url(${p.fundo})` } as React.CSSProperties}>
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
