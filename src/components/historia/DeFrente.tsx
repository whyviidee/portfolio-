import Image from "next/image";

const CAMINHOS = [
  { texto: "Tenho um projecto para construir", href: "mailto:ydagot@gmail.com?subject=Um%20projecto%20para%20construir", fora: false },
  { texto: "Tenho um evento", href: "mailto:booking.djdago@gmail.com?subject=Um%20evento", fora: false },
  { texto: "Só quero dizer olá", href: "https://instagram.com/deejay.dago", fora: true },
];

export default function DeFrente() {
  return (
    <section id="fala" className="frente" aria-labelledby="frente-titulo">
      <figure className="frente-foto">
        <Image src="/fotos/beira-mar.webp" alt="O Yuri de pé à beira-mar, de frente" width={1350} height={1800} sizes="(max-width: 700px) 100vw, 45vw" />
      </figure>
      <div className="frente-texto">
        <span className="frente-lugar">E tu?</span>
        <h2 id="frente-titulo">Fala comigo.</h2>
        <ul className="frente-caminhos">
          {CAMINHOS.map((c) => (
            <li key={c.texto}>
              <a href={c.href} {...(c.fora ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {c.texto}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
