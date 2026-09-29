import Link from "next/link";
import Rodape from "@/components/historia/Rodape";

export default function NotFound() {
  return (
    <main className="perdido">
      <span className="paragem-lugar">Erro 404</span>
      <h1>Esta página não existe.</h1>
      <p>Mas a história continua na página principal.</p>
      <Link href="/" className="nav-fala">Voltar ao início</Link>
      <Rodape />
    </main>
  );
}
