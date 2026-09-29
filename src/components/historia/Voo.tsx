"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { anunciarCapitulo } from "./capitulo";

// O motor do voo: um canvas preso ao ecrã desenha o vídeo frame a frame conforme o scroll.
// O mesmo vídeo (46 s) serve duas cenas: a vida (Vida.tsx) e o fim (Fim.tsx), cada uma com o seu troço.

const DURACAO = 46;
// As imagens originais onde o voo pousa (o segundo do vídeo): parado numa delas, a imagem nítida fica
// por cima do vídeo, que é mais mole por ser vídeo e estar esticado.
// Nas fotos reais dele a imagem nítida entra mais cedo (segundos de avanço): nos últimos segundos antes de aterrar,
// o vídeo inventa uma pessoa parecida, e ele pediu sempre a foto verdadeira.
const NITIDAS: [number, number][] = [[0, 0.35], [6, 0.35], [13, 0.35], [21, 0.35], [27, 1.2], [34, 1.75], [40, 0.35], [46, 3]];

export type ParagemVoo = { classe: string; fundo: string; conteudo: React.ReactNode };

type Props = {
  rotulo: string;
  // [ponto do scroll de 0 a 1, segundo do vídeo]: voa entre pontos, pára onde o segundo se repete
  trajecto: [number, number][];
  // quando cada paragem aparece e desaparece, em fracção do scroll
  janelas: [number, number][];
  paragens: ParagemVoo[];
  // o nome na navegação: [até que ponto do scroll, capítulo]; depois do fim da pista vale o último
  capitulos: [number, number][];
  altura: string;
  inicio: string;
  // troços [de, até] em segundos em que o vídeo fica parado no primeiro segundo e só a foto real entra por cima,
  // em dissolvência: é onde o vídeo, a chegar a uma foto dele, inventa uma pessoa parecida
  congelar?: [number, number][];
  abertura?: React.ReactNode;
  ancora?: string;
};

const suave = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const passo = (a: number, b: number, x: number) => Math.min(1, Math.max(0, (x - a) / (b - a)));

export default function Voo({ rotulo, trajecto, janelas, paragens, capitulos, altura, inicio, congelar = [], abertura, ancora }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const segundos = trajecto.map(([, s]) => s);
  const sMin = Math.min(...segundos), sMax = Math.max(...segundos);
  const nitidas = NITIDAS.filter(([s]) => s >= sMin && s <= sMax);

  useEffect(() => {
    const el = raiz.current!;
    const artigos = [...el.querySelectorAll<HTMLElement>(".paragem")];
    const abre = el.querySelector<HTMLElement>(".voo-abre");
    // O voo anda sempre com o scroll, mesmo com as animações do sistema desligadas: é quem visita que o conduz.
    // (Sem JavaScript, as páginas paradas do HTML continuam a contar a história.)
    el.classList.add("mexe");
    const movel = innerWidth < 700;
    const pasta = movel ? "/voo/m" : "/voo/d";
    const TOTAL = movel ? 184 : 230;
    const frame = (s: number) => (s / DURACAO) * (TOTAL - 1);
    const i0 = Math.max(0, Math.floor(frame(sMin))), i1 = Math.min(TOTAL - 1, Math.ceil(frame(sMax)));
    const noVideo = (s: number) => { const c = congelar.find(([de, ate]) => s > de && s <= ate); return c ? c[0] : s; };
    const tela = el.querySelector<HTMLCanvasElement>(".voo-tela")!;
    const imgsNitidas = [...el.querySelectorAll<HTMLElement>(".voo-nitida")];
    const ctx = tela.getContext("2d")!;
    const pista = el.querySelector<HTMLElement>(".voo-pista")!;
    const frames: HTMLImageElement[] = new Array(TOTAL);
    const prontas = new Set<HTMLImageElement>(); // só entra aqui depois de descodificada: desenhá-la já não engasga
    const url = (i: number) => `${pasta}/f_${String(i + 1).padStart(4, "0")}.webp`;
    const carregar = (i: number) => {
      if (i < i0 || i > i1 || frames[i]) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = url(i);
      img.decode().then(() => prontas.add(img), () => {});
      frames[i] = img;
    };
    for (let i = i0; i <= i1; i += 8) carregar(i); // um esqueleto primeiro, para o scroll rápido ter sempre imagem
    let k = i0;
    const encher = () => {
      for (let n = 0; n < 10 && k <= i1; n++, k++) carregar(k);
      if (k <= i1) timer = window.setTimeout(encher, 60);
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
      const i = Math.floor(f), a = f - i, A = frames[i], B = frames[Math.min(i + 1, i1)];
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

    const segundoDoVideo = (p: number) => {
      for (let i = 1; i < trajecto.length; i++) {
        const [p0, s0] = trajecto[i - 1], [p1, s1] = trajecto[i];
        if (p <= p1) return s0 + (s1 - s0) * suave(passo(p0, p1, p));
      }
      return trajecto[trajecto.length - 1][1];
    };

    // As medidas lêem-se no scroll e no resize, nunca dentro do laço: ler o layout depois de mexer em estilos engasga o browser
    let alvo = 0, mostrado = 0, fim = false, cap = -1, raf = 0, visivel = true, antes = 0, ultimo = -1, exacto = false;
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
      // parado, pousa num frame inteiro; a fundir dois frames só enquanto se mexe
      const segundo = segundoDoVideo(mostrado), parado = mostrado === alvo;
      const sv = noVideo(segundo);
      const f = parado ? Math.round(frame(sv)) : frame(sv);
      if (!exacto || Math.abs(f - ultimo) > 0.003) { exacto = desenhar(f); ultimo = f; }
      imgsNitidas.forEach((img, n) => {
        const [s, avanco] = nitidas[n];
        img.style.opacity = String(Math.max(0, segundo < s ? 1 - (s - segundo) / avanco : 1 - (segundo - s) / 0.35));
      });

      if (abre) {
        const saida = suave(passo(0.02, 0.1, mostrado));
        abre.style.opacity = String(1 - saida);
        abre.style.transform = `translateY(${-28 * saida}px)`;
      }
      artigos.forEach((p, n) => {
        const [a, b] = janelas[n];
        const v = suave(passo(a, a + 0.03, mostrado)) * (1 - suave(passo(b - 0.03, b, mostrado)));
        p.style.opacity = String(v);
        p.style.transform = `translateY(${(1 - v) * 24}px)`;
        p.style.pointerEvents = v > 0.5 ? "auto" : "none";
      });
      const activo = fim ? capitulos[capitulos.length - 1][1] : (capitulos.find(([ate]) => mostrado < ate) ?? capitulos[capitulos.length - 1])[1];
      if (activo !== cap) { cap = activo; anunciarCapitulo(activo); }
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
    // o trajecto e as janelas são constantes de cada cena
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={raiz} className="voo" aria-label={rotulo}>
      <div className="voo-pista" style={{ "--altura": altura } as React.CSSProperties}>
        <div className="voo-palco">
          <div className="voo-inicio" style={{ backgroundImage: `url(${inicio})` }} aria-hidden="true" />
          <canvas className="voo-tela" aria-hidden="true" />
          {nitidas.map(([s]) => (
            <Image key={s} className="voo-nitida" src={`/voo/nitida-${String(s).padStart(2, "0")}.webp`} alt="" aria-hidden="true" fill sizes="100vw" unoptimized />
          ))}
          {abertura && <div className="voo-abre">{abertura}</div>}
          {paragens.map((p, n) => (
            <article key={n} className={`paragem ${p.classe}`} style={{ "--fundo": `url(${p.fundo})` } as React.CSSProperties}>
              {p.conteudo}
            </article>
          ))}
        </div>
        {ancora && <div id={ancora} className="voo-ancora" aria-hidden="true" />}
      </div>
    </section>
  );
}
