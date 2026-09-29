import Link from "next/link";

// As ligações de sempre, numa linha discreta. Na página principal vivem dentro da última cena (Fim.tsx);
// nas outras páginas fecham a página sem barra.
export function Ligacoes() {
  return (
    <>
      <nav aria-label="Redes">
        <a href="https://instagram.com/deejay.dago" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://linkedin.com/in/whyviidee" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/whyviidee" target="_blank" rel="noopener noreferrer">GitHub</a>
        <Link href="/privacy">Privacidade</Link>
      </nav>
      <span className="rodape-assinatura">© {new Date().getFullYear()} Yuri Dagot · MWLBYD</span>
    </>
  );
}

export default function Rodape() {
  return (
    <footer className="rodape">
      <Ligacoes />
    </footer>
  );
}
