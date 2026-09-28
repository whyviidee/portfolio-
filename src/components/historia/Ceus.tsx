"use client";

import { useEffect, useState } from "react";

// Hora e temperatura de agora nas duas cidades (Open-Meteo, sem chave).
const CIDADES = [
  { nome: "Maputo", lat: -25.97, lon: 32.57, tz: "Africa/Maputo" },
  { nome: "Lisboa", lat: 38.72, lon: -9.14, tz: "Europe/Lisbon" },
];

const hora = (tz: string) =>
  new Intl.DateTimeFormat("pt-PT", { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date());

export default function Ceus() {
  const [agora, setAgora] = useState<string[] | null>(null);
  const [temps, setTemps] = useState<(number | null)[]>([null, null]);

  useEffect(() => {
    const pintar = () => setAgora(CIDADES.map((c) => hora(c.tz)));
    pintar();
    const t = setInterval(pintar, 30000);
    CIDADES.forEach((c, i) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m`)
        .then((r) => r.json())
        .then((j) => setTemps((v) => v.map((x, k) => (k === i ? j.current?.temperature_2m ?? null : x))))
        .catch(() => {});
    });
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ceus" role="group" aria-label="Hora e temperatura agora em Maputo e em Lisboa">
      {CIDADES.map((c, i) => (
        <span key={c.nome}>
          {c.nome}{" "}
          <b>
            {agora ? agora[i] : "··:··"}
            {temps[i] != null ? ` · ${Math.round(temps[i] as number)}°` : ""}
          </b>
        </span>
      ))}
    </div>
  );
}
