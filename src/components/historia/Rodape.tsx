import Link from "next/link";

export default function Rodape() {
  return (
    <footer className="rodape">
      <span>© {new Date().getFullYear()} Yuri Dagot · Maputo e Lisboa</span>
      <nav aria-label="Redes">
        <a href="https://instagram.com/deejay.dago" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://github.com/whyviidee" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/whyviidee" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <Link href="/privacy">Privacidade</Link>
      </nav>
      <span className="rodape-assinatura">MWLBYD</span>
    </footer>
  );
}
