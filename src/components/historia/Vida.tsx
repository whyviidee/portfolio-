import Image from "next/image";
import Voo, { type ParagemVoo } from "./Voo";

type Foto = { src: string; alt: string; legenda: string; w: number; h: number };

function Paragem({ lugar, titulo, texto, fotos }: { lugar: string; titulo: React.ReactNode; texto: string; fotos: Foto[] }) {
  return (
    <>
      <div className="paragem-texto">
        <span className="paragem-lugar">{lugar}</span>
        <h2>{titulo}</h2>
        <p>{texto}</p>
      </div>
      <div className="paragem-fotos">
        {fotos.map((f) => (
          <figure key={f.src}>
            <Image src={f.src} alt={f.alt} width={f.w} height={f.h} sizes="(max-width: 700px) 62vw, 34vw" />
            <figcaption>{f.legenda}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

const PARAGENS: ParagemVoo[] = [
  {
    classe: "paragem-1",
    fundo: "/voo/paragem-1.webp",
    conteudo: (
      <Paragem
        lugar="Maputo · 1996 a 2014"
        titulo="Cresci à beira do Índico."
        texto="Na Escola Portuguesa de Moçambique era guarda-redes da equipa de futsal e fazia as festas da escola. Tinha 15 anos quando o meu irmão chegou da Cidade do Cabo com um controlador de DJ. Aprendi quase tudo sozinho, no quarto, de fones, com o controlador em cima da cama e a minha mãe a mandar-me dormir porque no dia seguinte havia escola."
        fotos={[{ src: "/fotos/maputo-piscina.webp", alt: "O Yuri em criança, dentro de uma piscina em Maputo", legenda: "Maputo, em criança", w: 1715, h: 1645 }]}
      />
    ),
  },
  {
    classe: "paragem-2",
    fundo: "/voo/paragem-2.webp",
    conteudo: (
      <Paragem
        lugar="Lisboa · 2014"
        titulo="Vim estudar. Fiquei a tocar."
        texto="Entrei em Engenharia Informática. Uma festa Erasmus deu numa residência semanal, a tocar como WhyViiDee, o nome que já trazia de Maputo, feito das minhas iniciais: Y, V, D. Na ESN Lisboa fui RP e o DJ de todas as festas."
        fotos={[{ src: "/fotos/setup-2018.webp", alt: "O Yuri a sorrir atrás do setup de DJ, em casa, com um flamingo insuflável", legenda: "O setup em casa, 2018", w: 1400, h: 1400 }]}
      />
    ),
  },
  {
    classe: "paragem-3",
    fundo: "/voo/paragem-3.webp",
    conteudo: (
      <Paragem
        lugar="Cais do Sodré · a noite"
        titulo={
          <>
            Escolhi a pista.{" "}
            <span>É lá que sou mais feliz.</span>
          </>
        }
        texto="Comecei nas residências do Copenhagen, no Cais do Sodré, e foi aí que conheci a malta da noite. Criei a Vibez com o Kaombo e o Dilemma Club. Em 2020 decidi viver da música, mas a pandemia fechou a noite: continuei a trabalhar à distância e, quando tudo reabriu, em 2021, apostei a tempo inteiro. O WhyViiDee passou a Dagô, e hoje toco nas festas da GRVVE e nos espectáculos da New Sheet."
        fotos={[
          { src: "/fotos/cais-denon-2017.webp", alt: "O Yuri de braço no ar a tocar numa Denon, num clube escuro", legenda: "A noite a crescer, 2017", w: 851, h: 910 },
          { src: "/fotos/cais-esn-2017.webp", alt: "O Yuri de headphones a tocar numa festa da ESN", legenda: "Uma festa da ESN, 2017", w: 1068, h: 712 },
        ]}
      />
    ),
  },
  {
    classe: "paragem-4",
    fundo: "/voo/paragem-4.webp",
    conteudo: (
      <Paragem
        lugar="Os palcos grandes"
        titulo={
          <>
            Palcos que eu via{" "}
            <span>da pista.</span>
          </>
        }
        texto="Abri o concerto do Danny Ocean no Coliseu e toquei no palco BacanaPlay do Rock in Rio 2026. Em 2022 fiz parte da equipa de DJs da ESN Sea Battle, o cruzeiro que bateu três recordes do Guinness. Continuo a aprender em cada noite."
        fotos={[{ src: "/fotos/rock-in-rio-palco.webp", alt: "O palco BacanaPlay cheio de gente no Rock in Rio", legenda: "Palco BacanaPlay, Rock in Rio 2026", w: 2200, h: 1467 }]}
      />
    ),
  },
  {
    classe: "paragem-construir",
    fundo: "/voo/nitida-40.webp",
    conteudo: (
      <div className="paragem-texto">
        <span className="paragem-lugar">Lisboa · desde 2025</span>
        <h2>
          E agora construo as coisas{" "}
          <span>de que eu próprio precisava.</span>
        </h2>
        <p>Sempre gostei de informática. Em 2025 voltei ao código e a AI deixou-me fazer sozinho o que antes pedia uma equipa.</p>
      </div>
    ),
  },
];

// O vídeo tem 46 s; esta cena vai do segundo 0 ao 40 (o Tejo ao nascer do sol). O texto das paragens 1 e 2 aparece
// no quarto (6 s) e em Lisboa (13 s); o das 3 e 4 na aproximação (o terraço do Cais do Gás, 21 s, e o festival
// visto de cima, 31 s) e sai antes de o voo aterrar nas fotos reais dele (Fiesta Dura, 27 s, e Rock in Rio, 34 s).
const TRAJECTO: [number, number][] = [
  [0, 0], [0.04, 0],
  [0.11, 6], [0.19, 6],
  [0.26, 13], [0.33, 13],
  [0.43, 21], [0.5, 21],
  [0.56, 27], [0.6, 27],
  [0.66, 31], [0.72, 31],
  [0.77, 34], [0.81, 34],
  [0.92, 40], [1, 40],
];
const JANELAS: [number, number][] = [[0.105, 0.195], [0.255, 0.335], [0.425, 0.505], [0.655, 0.725], [0.925, 1.2]];
const CAPITULOS: [number, number][] = [[0.22, 0], [0.4, 1], [0.9, 2], [2, 3]];

export default function Vida() {
  return (
    <Voo
      rotulo="Da Marginal de Maputo ao Tejo"
      trajecto={TRAJECTO}
      janelas={JANELAS}
      paragens={PARAGENS}
      capitulos={CAPITULOS}
      altura="1100vh"
      inicio="/voo/inicio.webp"
      congelar={[[32.25, 34]]}
      abertura={
        <>
          <h1>
            Sou de Maputo.{" "}
            <span>Vivo em Lisboa.</span>
          </h1>
          <p>Passei a vida a juntar pessoas, na pista e nas festas que criei. Agora construo as coisas de que eu próprio precisava.</p>
          <span className="voo-sitio">Marginal, Maputo</span>
        </>
      }
    />
  );
}
