import Voo, { type ParagemVoo } from "./Voo";

// O fim fecha o círculo: o site abre com ele em miúdo, de costas, a olhar o Índico; acaba com ele hoje, de frente, à beira-mar.
// O voo retoma do Tejo ao nascer do sol (segundo 40) e voa sobre a água até ao 43; daí a foto real dele entra
// em dissolvência. O vídeo não passa do 43 porque a seguir inventa uma pessoa parecida com ele a andar.
const PARAGENS: ParagemVoo[] = [
  {
    classe: "paragem-fim",
    fundo: "/voo/nitida-46.webp",
    conteudo: (
      <div className="fim-texto">
        <span className="paragem-lugar">E tu?</span>
        <h2>Fala comigo.</h2>
        <a className="fim-email" href="mailto:ydagot@gmail.com">
          ydagot@gmail.com
        </a>
        <p className="fim-outros">
          Para eventos: <a href="mailto:booking.djdago@gmail.com">booking.djdago@gmail.com</a>
          <span aria-hidden="true"> · </span>
          <a href="https://instagram.com/deejay.dago" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </p>
      </div>
    ),
  },
];

const TRAJECTO: [number, number][] = [[0, 40], [0.12, 40], [0.78, 46], [1, 46]];
const JANELAS: [number, number][] = [[0.8, 1.2]];
const CAPITULOS: [number, number][] = [[2, 3]];

export default function Fim() {
  return (
    <Voo
      rotulo="Do Tejo ao mar, e fala comigo"
      trajecto={TRAJECTO}
      janelas={JANELAS}
      paragens={PARAGENS}
      capitulos={CAPITULOS}
      altura="420vh"
      inicio="/voo/nitida-40.webp"
      congelar={[[43, 46]]}
      ancora="fala"
    />
  );
}
