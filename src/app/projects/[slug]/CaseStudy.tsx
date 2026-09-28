import Link from "next/link";
import { projects, type Project } from "@/data/projects";

function vizinhos(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return { antes: projects[(i - 1 + projects.length) % projects.length], depois: projects[(i + 1) % projects.length] };
}

export default function CaseStudy({ project: p }: { project: Project }) {
  const { antes, depois } = vizinhos(p.slug);

  return (
    <main className="caso">
      <header className="caso-cabeca">
        <Link href="/#projectos" className="caso-voltar">
          ← Todos os projectos
        </Link>
        <span className="caso-meta">
          {p.type} · {p.year}
          {p.estado && <em>{p.estado}</em>}
        </span>
        <h1>{p.title}</h1>
        <p>{p.longDescription}</p>
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="caso-visitar">
            Visitar o site
          </a>
        )}
      </header>

      <dl className="caso-numeros">
        {p.highlights.map((h) => (
          <div key={h.label}>
            <dt>{h.label}</dt>
            <dd>{h.value}</dd>
          </div>
        ))}
      </dl>

      <div className="caso-historia">
        {[
          ["O problema", p.problem],
          ["O que fiz", p.solution],
          ["Onde está hoje", p.result],
        ].map(([titulo, texto]) => (
          <section key={titulo}>
            <h2>{titulo}</h2>
            <p>{texto}</p>
          </section>
        ))}
        <section>
          <h2>Feito com</h2>
          <p className="caso-tech">{p.tech.join(" · ")}</p>
        </section>
      </div>

      <nav className="caso-seguinte" aria-label="Outros projectos">
        <Link href={`/projects/${antes.slug}`}>
          <span>← Anterior</span>
          {antes.title}
        </Link>
        <Link href={`/projects/${depois.slug}`}>
          <span>Seguinte →</span>
          {depois.title}
        </Link>
      </nav>
    </main>
  );
}
