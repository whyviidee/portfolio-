"use client";

import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

type Section = "projects" | "about" | "skills" | "contact" | null;

const ACCENT = {
  projects: "#F59E0B",
  skills: "#6366F1",
  about: "#C084FC",
  contact: "#10B981",
} as const;

// ─── Beat clock ──────────────────────────────────────────────────────────────
const BPM = 124;
const BEAT_S = 60 / BPM;
function beatEnv(t: number, sharpness = 6) {
  const phase = (t % BEAT_S) / BEAT_S;
  return Math.pow(1 - phase, sharpness);
}

// ─── Input (keyboard) ────────────────────────────────────────────────────────
function useKeyState() {
  const keys = useRef<Record<string, boolean>>({});
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);
  return keys;
}

// ─── Player Character (DJ) ───────────────────────────────────────────────────
function Player({
  posRef,
  movingRef,
}: {
  posRef: React.MutableRefObject<THREE.Vector3>;
  movingRef: React.MutableRefObject<boolean>;
}) {
  const group = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  const armL = useRef<THREE.Mesh>(null!);
  const armR = useRef<THREE.Mesh>(null!);
  const legL = useRef<THREE.Mesh>(null!);
  const legR = useRef<THREE.Mesh>(null!);

  useFrame((s, dt) => {
    if (!group.current) return;
    group.current.position.copy(posRef.current);
    const t = s.clock.getElapsedTime();
    const env = beatEnv(t);
    const moving = movingRef.current;
    // Bob com a batida
    group.current.position.y = posRef.current.y + (moving ? Math.abs(Math.sin(t * 9)) * 0.06 : env * 0.05);
    if (headRef.current) headRef.current.rotation.z = Math.sin(t * 3) * 0.06;
    if (moving) {
      const sw = Math.sin(t * 9);
      if (armL.current) armL.current.rotation.x = sw * 0.7;
      if (armR.current) armR.current.rotation.x = -sw * 0.7;
      if (legL.current) legL.current.rotation.x = -sw * 0.6;
      if (legR.current) legR.current.rotation.x = sw * 0.6;
    } else {
      // Headphones DJ pose
      if (armL.current) armL.current.rotation.x = THREE.MathUtils.lerp(armL.current.rotation.x, -0.6, 0.1);
      if (armR.current) armR.current.rotation.x = THREE.MathUtils.lerp(armR.current.rotation.x, -0.4, 0.1);
      if (legL.current) legL.current.rotation.x = THREE.MathUtils.lerp(legL.current.rotation.x, 0, 0.1);
      if (legR.current) legR.current.rotation.x = THREE.MathUtils.lerp(legR.current.rotation.x, 0, 0.1);
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Sombra adicional sob o player */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 24]} />
        <meshBasicMaterial color="#000" transparent opacity={0.45} />
      </mesh>

      {/* Tronco */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.46, 0.6, 0.3]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* T-shirt logo glow */}
      <mesh position={[0, 0.7, 0.151]}>
        <planeGeometry args={[0.18, 0.18]} />
        <meshBasicMaterial color="#F59E0B" toneMapped={false} />
      </mesh>

      {/* Cabeça */}
      <mesh ref={headRef} position={[0, 1.18, 0]} castShadow>
        <boxGeometry args={[0.32, 0.32, 0.3]} />
        <meshStandardMaterial color="#7a4a35" roughness={0.6} />
      </mesh>
      {/* Cabelo */}
      <mesh position={[0, 1.32, -0.02]}>
        <boxGeometry args={[0.34, 0.1, 0.32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>
      {/* Headphones — arco */}
      <mesh position={[0, 1.32, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.18, 0.02, 8, 18, Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.18, 1.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.18, 1.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Braços */}
      <mesh ref={armL} position={[-0.27, 0.9, 0]} castShadow>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.7} />
      </mesh>
      <mesh ref={armR} position={[0.27, 0.9, 0]} castShadow>
        <boxGeometry args={[0.12, 0.5, 0.12]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.7} />
      </mesh>

      {/* Pernas */}
      <mesh ref={legL} position={[-0.11, 0.32, 0]} castShadow>
        <boxGeometry args={[0.16, 0.55, 0.16]} />
        <meshStandardMaterial color="#080813" roughness={0.85} />
      </mesh>
      <mesh ref={legR} position={[0.11, 0.32, 0]} castShadow>
        <boxGeometry args={[0.16, 0.55, 0.16]} />
        <meshStandardMaterial color="#080813" roughness={0.85} />
      </mesh>

      {/* Glow ring no chão */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.46, 32]} />
        <meshBasicMaterial color="#F59E0B" toneMapped={false} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─── Crowd ───────────────────────────────────────────────────────────────────
function Crowd() {
  const N = 36;
  const refs = useRef<(THREE.Group | null)[]>([]);
  const data = useMemo(() => {
    const arr: { x: number; z: number; phase: number; height: number; color: string; }[] = [];
    const colors = ["#1a1a22", "#262030", "#1f1730", "#221426", "#0e1a26", "#10171a", "#1a0f1a"];
    // Distribui pessoas em círculo + dispersão
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const r = 1.6 + Math.random() * 2.5;
      const x = Math.cos(a) * r + (Math.random() - 0.5) * 0.6;
      const z = 1.0 + Math.sin(a) * r * 0.7 + (Math.random() - 0.5) * 0.6;
      arr.push({
        x, z,
        phase: Math.random() * Math.PI * 2,
        height: 1.4 + Math.random() * 0.25,
        color: colors[i % colors.length],
      });
    }
    return arr;
  }, []);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    const env = beatEnv(t);
    refs.current.forEach((g, i) => {
      if (!g) return;
      const d = data[i];
      const bob = Math.abs(Math.sin(t * 4.5 + d.phase)) * 0.15 + env * 0.18;
      g.position.y = bob;
      g.rotation.y = Math.sin(t * 1.2 + d.phase) * 0.15;
      // Mãos no ar — simula sway
      const sway = Math.sin(t * 3 + d.phase);
      g.rotation.z = sway * 0.04;
    });
  });

  return (
    <group>
      {data.map((d, i) => (
        <group
          key={i}
          ref={(g) => { refs.current[i] = g; }}
          position={[d.x, 0, d.z]}
        >
          {/* Tronco */}
          <mesh castShadow position={[0, d.height * 0.5 - 0.3, 0]}>
            <capsuleGeometry args={[0.16, d.height - 0.3, 4, 8]} />
            <meshStandardMaterial color={d.color} roughness={0.85} metalness={0.1} />
          </mesh>
          {/* Cabeça */}
          <mesh castShadow position={[0, d.height + 0.05, 0]}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color={d.color === "#0e1a26" ? "#5a3a25" : "#3a2418"} roughness={0.7} />
          </mesh>
          {/* Braços levantados (uns sim, uns não) */}
          {(i % 3 !== 0) && (
            <>
              <mesh position={[-0.15, d.height + 0.0, 0]} rotation={[0, 0, 0.6]}>
                <capsuleGeometry args={[0.045, 0.4, 3, 6]} />
                <meshStandardMaterial color={d.color} roughness={0.9} />
              </mesh>
              <mesh position={[0.15, d.height + 0.0, 0]} rotation={[0, 0, -0.6]}>
                <capsuleGeometry args={[0.045, 0.4, 3, 6]} />
                <meshStandardMaterial color={d.color} roughness={0.9} />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  );
}

// ─── CDJ (Pioneer CDJ-3000 inspired) ────────────────────────────────────────
function CDJ({
  position, accent, label,
  hot, onClick, onOver, onOut,
}: {
  position: [number, number, number]; accent: string; label: string;
  hot: boolean; onClick: () => void; onOver: () => void; onOut: () => void;
}) {
  const jogRef = useRef<THREE.Mesh>(null!);
  const screenRef = useRef<THREE.MeshStandardMaterial>(null!);
  const tRef = useRef(0);
  useFrame((_, dt) => {
    tRef.current += dt;
    if (jogRef.current) jogRef.current.rotation.y += dt * 0.6;
    if (screenRef.current) {
      const env = beatEnv(tRef.current);
      screenRef.current.emissiveIntensity = (hot ? 3 : 1.6) + env * 1.4;
    }
  });
  return (
    <group position={position} onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}>
      {/* Corpo */}
      <mesh castShadow receiveShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[1.05, 0.12, 1.35]} />
        <meshPhysicalMaterial color="#0a0a14" roughness={0.32} metalness={0.7} clearcoat={0.7} clearcoatRoughness={0.18} />
      </mesh>
      {/* Top borda */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[1.06, 0.012, 1.36]} />
        <meshPhysicalMaterial color="#15151c" metalness={1} roughness={0.22} />
      </mesh>
      {/* Screen (cima) */}
      <mesh position={[0, 0.032, -0.45]}>
        <planeGeometry args={[0.78, 0.36]} />
        <meshStandardMaterial
          ref={screenRef}
          color="#000"
          emissive={accent}
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      {/* Waveform fake */}
      {Array.from({ length: 36 }).map((_, i) => {
        const h = 0.04 + Math.abs(Math.sin(i * 0.7 + position[0])) * 0.18;
        return (
          <mesh key={i} position={[-0.36 + (i / 36) * 0.72, 0.034, -0.45]}>
            <boxGeometry args={[0.014, 0.001, h]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={hot ? 4 : 2.5} toneMapped={false} />
          </mesh>
        );
      })}
      {/* Linha play central */}
      <mesh position={[0, 0.035, -0.45]}>
        <boxGeometry args={[0.004, 0.001, 0.36]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hot ? 8 : 5} toneMapped={false} />
      </mesh>

      {/* Jog wheel (grande) */}
      <mesh ref={jogRef} position={[0, 0.04, 0.18]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.04, 56]} />
        <meshPhysicalMaterial color="#0a0a0e" roughness={0.55} metalness={0.4} />
      </mesh>
      {/* Jog wheel anel exterior */}
      <mesh position={[0, 0.052, 0.18]}>
        <torusGeometry args={[0.395, 0.012, 8, 64]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={hot ? 6 : 3} toneMapped={false} />
      </mesh>
      {/* Jog wheel centro */}
      <mesh position={[0, 0.062, 0.18]}>
        <cylinderGeometry args={[0.18, 0.18, 0.005, 32]} />
        <meshStandardMaterial color="#000" emissive={accent} emissiveIntensity={hot ? 3 : 1.5} toneMapped={false} />
      </mesh>
      {/* Tracker line no jog (mostra rotação) */}
      <mesh position={[0, 0.063, 0.18]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.004, 0.001, 0.16]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={hot ? 5 : 2} toneMapped={false} />
      </mesh>

      {/* Performance pads (4x2 grid à esquerda do jog) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const colors = ["#06b6d4", "#10b981", "#F59E0B", "#ec4899", "#7c3aed", "#3b82f6", "#10b981", "#fbbf24"];
        const x = -0.42 + col * 0.06;
        const z = 0.55 + row * 0.07;
        return (
          <mesh key={i} position={[x, 0.034, z]}>
            <boxGeometry args={[0.052, 0.005, 0.052]} />
            <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={hot ? 4 : 1.6} toneMapped={false} />
          </mesh>
        );
      })}
      {/* Hot cue / loop pads à direita */}
      {Array.from({ length: 8 }).map((_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 0.18 + col * 0.06;
        const z = 0.55 + row * 0.07;
        return (
          <mesh key={i} position={[x, 0.034, z]}>
            <boxGeometry args={[0.052, 0.005, 0.052]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={hot ? 2.5 : 1} toneMapped={false} />
          </mesh>
        );
      })}

      {/* Play / cue buttons frontais */}
      <mesh position={[-0.18, 0.034, 0.62]}>
        <cylinderGeometry args={[0.04, 0.04, 0.005, 24]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={hot ? 6 : 3} toneMapped={false} />
      </mesh>
      <mesh position={[0.18, 0.034, 0.62]}>
        <cylinderGeometry args={[0.04, 0.04, 0.005, 24]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={hot ? 6 : 3} toneMapped={false} />
      </mesh>

      {/* Pitch fader (lado direito) */}
      <mesh position={[0.46, 0.03, 0]}>
        <boxGeometry args={[0.06, 0.003, 0.7]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
      <mesh position={[0.46, 0.038, hot ? 0.05 : 0]}>
        <boxGeometry args={[0.11, 0.022, 0.05]} />
        <meshStandardMaterial color="#eee" emissive={hot ? accent : "#000"} emissiveIntensity={hot ? 1 : 0} metalness={0.6} />
      </mesh>

      {hot && <pointLight position={[0, 0.8, 0]} color={accent} intensity={18} distance={3} decay={2} />}
      <HoverTag visible={hot} text={label} color={accent} y={1.0} />
    </group>
  );
}

// ─── DJM Mixer (Pioneer DJM-A9 inspired) ─────────────────────────────────────
function DJM({ hot, onClick, onOver, onOut }: {
  hot: boolean; onClick: () => void; onOver: () => void; onOut: () => void;
}) {
  const tRef = useRef(0);
  const vuRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame((_, dt) => {
    tRef.current += dt;
    const env = beatEnv(tRef.current);
    vuRefs.current.forEach((m, i) => {
      if (!m) return;
      const k = (Math.sin(tRef.current * 4 + i) * 0.5 + 0.5) * (0.6 + env);
      m.emissiveIntensity = 1 + k * 5;
    });
  });
  return (
    <group onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}>
      {/* Corpo */}
      <mesh castShadow receiveShadow position={[0, -0.04, 0]}>
        <boxGeometry args={[1.0, 0.12, 1.35]} />
        <meshPhysicalMaterial color="#0a0a14" roughness={0.3} metalness={0.7} clearcoat={0.8} clearcoatRoughness={0.15} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[1.01, 0.012, 1.36]} />
        <meshPhysicalMaterial color="#16161e" metalness={1} roughness={0.2} />
      </mesh>
      {/* FX screen */}
      <mesh position={[0, 0.032, -0.5]}>
        <planeGeometry args={[0.7, 0.22]} />
        <meshStandardMaterial color="#000" emissive="#6366F1" emissiveIntensity={hot ? 3 : 1.5} toneMapped={false} />
      </mesh>
      {/* FX label area */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[-0.27 + i * 0.11, 0.034, -0.5]}>
          <boxGeometry args={[0.08, 0.001, 0.16]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={hot ? 1.5 : 0.6} toneMapped={false} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* 4 channel strips */}
      {[-0.36, -0.12, 0.12, 0.36].map((x, ci) => {
        const eqColors = ["#7c3aed", "#3b82f6", "#10b981"];
        return (
          <group key={ci}>
            {/* Trim/gain (cima) */}
            <mesh position={[x, 0.04, -0.25]}>
              <cylinderGeometry args={[0.05, 0.05, 0.04, 24]} />
              <meshPhysicalMaterial color="#1a1a22" metalness={0.85} roughness={0.2} />
            </mesh>
            <mesh position={[x, 0.06, -0.25]}>
              <cylinderGeometry args={[0.05, 0.05, 0.001, 24]} />
              <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={hot ? 4 : 2} toneMapped={false} />
            </mesh>
            <mesh position={[x, 0.062, -0.215]}>
              <boxGeometry args={[0.005, 0.002, 0.035]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3} toneMapped={false} />
            </mesh>

            {/* EQ knobs (high/mid/low) */}
            {[-0.1, 0.05, 0.2].map((z, ki) => (
              <group key={ki}>
                <mesh position={[x, 0.04, z]}>
                  <cylinderGeometry args={[0.04, 0.04, 0.035, 22]} />
                  <meshPhysicalMaterial color={eqColors[ki]} metalness={0.55} roughness={0.3} />
                </mesh>
                <mesh position={[x, 0.06, z + 0.025]}>
                  <boxGeometry args={[0.004, 0.002, 0.025]} />
                  <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} toneMapped={false} />
                </mesh>
              </group>
            ))}

            {/* CUE button */}
            <mesh position={[x, 0.034, 0.32]}>
              <boxGeometry args={[0.07, 0.005, 0.04]} />
              <meshStandardMaterial
                ref={(m) => { if (m) vuRefs.current[ci] = m as THREE.MeshStandardMaterial; }}
                color="#10b981" emissive="#10b981" emissiveIntensity={2} toneMapped={false}
              />
            </mesh>

            {/* Channel fader */}
            <mesh position={[x, 0.03, 0.55]}>
              <boxGeometry args={[0.05, 0.004, 0.34]} />
              <meshStandardMaterial color="#050507" />
            </mesh>
            <mesh position={[x, 0.04, 0.55 - (ci % 2 === 0 ? 0.05 : 0.1)]}>
              <boxGeometry args={[0.1, 0.022, 0.06]} />
              <meshStandardMaterial color="#eee" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Crossfader */}
      <mesh position={[0, 0.03, 0.62]}>
        <boxGeometry args={[0.85, 0.004, 0.05]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
      <mesh position={[hot ? 0.1 : -0.05, 0.04, 0.62]}>
        <boxGeometry args={[0.08, 0.022, 0.1]} />
        <meshStandardMaterial color="#fff" emissive={hot ? "#6366F1" : "#000"} emissiveIntensity={hot ? 1.4 : 0} metalness={0.6} />
      </mesh>

      {/* LED frente */}
      <mesh position={[0, 0.03, 0.68]}>
        <boxGeometry args={[0.98, 0.004, 0.012]} />
        <meshStandardMaterial color="#6366F1" emissive="#6366F1" emissiveIntensity={hot ? 12 : 6} toneMapped={false} />
      </mesh>

      {hot && <pointLight position={[0, 0.7, 0]} color="#6366F1" intensity={22} distance={3.5} decay={2} />}
      <HoverTag visible={hot} text="SKILLS" color="#6366F1" y={1.05} />
    </group>
  );
}

// ─── Laptop em stand ─────────────────────────────────────────────────────────
function LaptopStand({
  position, hot, onClick, onOver, onOut,
}: {
  position: [number, number, number]; hot: boolean;
  onClick: () => void; onOver: () => void; onOut: () => void;
}) {
  const screenRef = useRef<THREE.MeshStandardMaterial>(null!);
  const tRef = useRef(0);
  useFrame((_, dt) => {
    tRef.current += dt;
    const env = beatEnv(tRef.current);
    if (screenRef.current) screenRef.current.emissiveIntensity = (hot ? 3 : 1.5) + env * 1.2;
  });
  return (
    <group position={position} onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}>
      {/* Stand — base */}
      <mesh castShadow position={[0, -0.06, 0]}>
        <boxGeometry args={[0.55, 0.025, 0.35]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Stand — pernas */}
      {[-0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0]} rotation={[0.25, 0, 0]} castShadow>
          <boxGeometry args={[0.025, 0.22, 0.025]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
      {/* Stand — barra horizontal frente */}
      <mesh position={[0, 0.13, 0.04]} castShadow>
        <boxGeometry args={[0.5, 0.025, 0.04]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Stand — barra trás */}
      <mesh position={[0, 0.13, -0.05]} castShadow>
        <boxGeometry args={[0.5, 0.025, 0.04]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Laptop em cima do stand */}
      <group position={[0, 0.16, 0]} rotation={[-0.15, 0, 0]}>
        {/* Base (teclado) */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.03, 0.5]} />
          <meshPhysicalMaterial color="#161616" metalness={0.95} roughness={0.18} clearcoat={0.5} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.018, 0.13]}>
          <boxGeometry args={[0.22, 0.001, 0.14]} />
          <meshStandardMaterial color="#1c1c1c" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Tecla glow */}
        <mesh position={[0, 0.017, -0.08]}>
          <boxGeometry args={[0.5, 0.001, 0.22]} />
          <meshStandardMaterial color="#000" emissive="#F59E0B" emissiveIntensity={hot ? 1.2 : 0.5} toneMapped={false} transparent opacity={0.5} />
        </mesh>

        {/* Ecrã */}
        <group position={[0, 0.015, -0.25]} rotation={[-1.8, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 0.02, 0.48]} />
            <meshPhysicalMaterial color="#161616" metalness={0.95} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.011, 0.02]}>
            <planeGeometry args={[0.62, 0.4]} />
            <meshStandardMaterial
              ref={screenRef}
              color={hot ? "#F59E0B" : "#0a0a30"}
              emissive={hot ? "#F59E0B" : "#3b3bff"}
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
          {/* Code lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const w = 0.12 + (i * 137 % 30) / 100;
            return (
              <mesh key={i} position={[-0.28 + w / 2, 0.012, 0.15 - i * 0.06]}>
                <boxGeometry args={[w, 0.001, 0.018]} />
                <meshStandardMaterial color={hot ? "#000" : "#fff"} emissive={hot ? "#000" : "#fff"} emissiveIntensity={hot ? 0 : 2} toneMapped={false} />
              </mesh>
            );
          })}
        </group>
      </group>

      {hot && <pointLight position={[0, 0.7, 0.4]} color="#F59E0B" intensity={16} distance={3} decay={2} />}
      <HoverTag visible={hot} text="PROJECTS" color="#F59E0B" y={1.1} />
    </group>
  );
}

// ─── HoverTag (texto) ────────────────────────────────────────────────────────
function HoverTag({ visible, text, color, y = 1.2 }: { visible: boolean; text: string; color: string; y?: number }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 512, 128);
    ctx.font = "700 56px ui-sans-serif, system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 24;
    ctx.fillStyle = color;
    ctx.fillText(text, 256, 64);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.fillText(text, 256, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [text, color]);
  if (!visible) return null;
  return (
    <Float speed={3} floatIntensity={0.4}>
      <mesh position={[0, y, 0]}>
        <planeGeometry args={[1.3, 0.32]} />
        <meshBasicMaterial map={tex} transparent toneMapped={false} />
      </mesh>
    </Float>
  );
}

// ─── Booth (mesa do DJ) ──────────────────────────────────────────────────────
function Booth() {
  return (
    <group>
      {/* Tampo da booth */}
      <mesh position={[0, 0.85, -3.4]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 0.08, 1.7]} />
        <meshPhysicalMaterial color="#0a0810" roughness={0.4} metalness={0.55} clearcoat={0.6} />
      </mesh>
      {/* Borda LED frontal */}
      <mesh position={[0, 0.85, -2.56]}>
        <boxGeometry args={[5.82, 0.012, 0.02]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={9} toneMapped={false} />
      </mesh>
      {/* Pés laterais */}
      {[[-2.7, -3.4], [2.7, -3.4], [-2.7, -4.15], [2.7, -4.15]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.42, z]} castShadow>
          <boxGeometry args={[0.08, 0.86, 0.08]} />
          <meshStandardMaterial color="#050308" roughness={0.95} />
        </mesh>
      ))}
      {/* Painel frontal preto */}
      <mesh position={[0, 0.42, -2.56]}>
        <boxGeometry args={[5.8, 0.84, 0.04]} />
        <meshPhysicalMaterial color="#04040a" roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Logo glow no painel frontal */}
      <mesh position={[0, 0.42, -2.535]}>
        <planeGeometry args={[2.0, 0.22]} />
        <meshStandardMaterial color="#000" emissive="#F59E0B" emissiveIntensity={0.7} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ─── Stage / Floor ───────────────────────────────────────────────────────────
function Floor() {
  // Dancefloor com padrão de luzes
  return (
    <group>
      {/* Chão principal */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 18]} />
        <meshPhysicalMaterial color="#06050d" roughness={0.45} metalness={0.5} clearcoat={0.4} clearcoatRoughness={0.3} />
      </mesh>
      {/* Dancefloor central — quadrados luminosos */}
      {Array.from({ length: 6 }).map((_, i) =>
        Array.from({ length: 6 }).map((_, j) => {
          const x = (i - 2.5) * 0.95;
          const z = (j - 2.5) * 0.95 + 1.5;
          const isOn = (i + j) % 2 === 0;
          return (
            <mesh key={`${i}-${j}`} position={[x, 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshStandardMaterial
                color={isOn ? "#0d0a1a" : "#040308"}
                emissive={isOn ? "#7c3aed" : "#0a0410"}
                emissiveIntensity={isOn ? 0.45 : 0.1}
              />
            </mesh>
          );
        })
      )}

      {/* Plataforma elevada da booth */}
      <mesh position={[0, 0.045, -3.5]} receiveShadow castShadow>
        <boxGeometry args={[7, 0.09, 2.6]} />
        <meshPhysicalMaterial color="#070512" roughness={0.5} metalness={0.45} />
      </mesh>
      {/* LED edge da plataforma */}
      <mesh position={[0, 0.095, -2.2]}>
        <boxGeometry args={[7, 0.015, 0.03]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={6} toneMapped={false} />
      </mesh>
      <mesh position={[-3.5, 0.095, -3.5]}>
        <boxGeometry args={[0.03, 0.015, 2.6]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={5} toneMapped={false} />
      </mesh>
      <mesh position={[3.5, 0.095, -3.5]}>
        <boxGeometry args={[0.03, 0.015, 2.6]} />
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={5} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ─── Speaker stack ───────────────────────────────────────────────────────────
function SpeakerStack({ position, side, hot, onClick, onOver, onOut }: {
  position: [number, number, number]; side: "L" | "R"; hot: boolean;
  onClick: () => void; onOver: () => void; onOut: () => void;
}) {
  const wooferRef = useRef<THREE.Group>(null!);
  const tRef = useRef(0);
  useFrame((_, dt) => {
    tRef.current += dt;
    const env = beatEnv(tRef.current);
    if (wooferRef.current) wooferRef.current.position.z = 0.43 + env * 0.05;
  });
  const sx = side === "L" ? -1 : 1;
  return (
    <group position={position} onClick={onClick} onPointerOver={onOver} onPointerOut={onOut}>
      {/* Sub */}
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.05, 1.1, 0.85]} />
        <meshPhysicalMaterial color="#040408" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Top box */}
      <mesh castShadow receiveShadow position={[0, 1.65, 0]}>
        <boxGeometry args={[0.85, 1.05, 0.7]} />
        <meshPhysicalMaterial color="#06060c" roughness={0.6} metalness={0.25} />
      </mesh>
      {/* Sub woofer */}
      <group ref={wooferRef} position={[0, 0.55, 0.43]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.06, 32]} />
          <meshStandardMaterial color="#0e0e10" roughness={0.85} />
        </mesh>
      </group>
      {/* Top woofer */}
      <mesh position={[0, 1.45, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.05, 32]} />
        <meshStandardMaterial color="#0e0e10" roughness={0.85} />
      </mesh>
      {/* Tweeter */}
      <mesh position={[0, 1.95, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
        <meshStandardMaterial color={hot ? "#10b981" : "#1a1a1a"} emissive={hot ? "#10b981" : "#000"} emissiveIntensity={hot ? 6 : 0} toneMapped={false} />
      </mesh>
      {/* Logo */}
      <mesh position={[0, 0.15, 0.43]}>
        <boxGeometry args={[0.55, 0.02, 0.012]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={hot ? 12 : 4} toneMapped={false} />
      </mesh>
      {/* Side LED */}
      <mesh position={[sx * 0.43, 1.1, 0]}>
        <boxGeometry args={[0.012, 2.0, 0.65]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={hot ? 7 : 1.5} toneMapped={false} />
      </mesh>
      {hot && <pointLight position={[sx * 1, 1.5, 1]} color="#10b981" intensity={25} distance={6} decay={2} />}
      <HoverTag visible={hot} text="CONTACT" color="#10b981" y={2.7} />
    </group>
  );
}

// ─── Truss + spotlights ──────────────────────────────────────────────────────
function MovingSpot({ color, side, phase = 0 }: { color: string; side: "L" | "R"; phase?: number }) {
  const ref = useRef<THREE.SpotLight>(null!);
  const sx = side === "L" ? -1 : 1;
  useFrame((s) => {
    const t = s.clock.getElapsedTime() + phase;
    if (ref.current) {
      ref.current.target.position.x = Math.sin(t * 0.5) * 4 * sx * 0.5;
      ref.current.target.position.z = Math.cos(t * 0.4) * 1.5;
      ref.current.target.updateMatrixWorld();
    }
  });
  return (
    <>
      <spotLight ref={ref} position={[sx * 5, 6.5, -2]} angle={0.28} penumbra={0.45}
        intensity={140} distance={22} decay={2} color={color} castShadow />
      <mesh position={[sx * 5, 6.5, -2]}>
        <cylinderGeometry args={[0.12, 0.18, 0.4, 16]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.3} />
      </mesh>
    </>
  );
}

function Truss() {
  return (
    <group position={[0, 6.5, -2]}>
      <mesh>
        <boxGeometry args={[14, 0.08, 0.08]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[14, 0.06, 0.06]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.3} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-6.4 + i * 1.8, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.04, 0.55, 0.04]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
      {[-6.5, 6.5].map((x, i) => (
        <mesh key={i} position={[x, -3.2, 0]}>
          <boxGeometry args={[0.1, 6.4, 0.1]} />
          <meshStandardMaterial color="#15151c" metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Smoke particles ─────────────────────────────────────────────────────────
function Smoke() {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 220;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 5 + 0.3;
      arr[i * 3 + 2] = -3 + (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += dt * 0.08;
      if (arr[i * 3 + 1] > 5.5) arr[i * 3 + 1] = 0.3;
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.24} color="#3a2a55" transparent opacity={0.18} depthWrite={false} sizeAttenuation />
    </points>
  );
}

// ─── Interaction Zone (anel no chão + glow) ──────────────────────────────────
function InteractionZone({
  position, color, label, active,
}: {
  position: [number, number, number]; color: string; label: string; active: boolean;
}) {
  const innerRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    const pulse = (Math.sin(t * 3) * 0.5 + 0.5);
    if (innerRef.current) {
      const m = innerRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = active ? 0.7 + pulse * 0.3 : 0.35;
    }
    if (outerRef.current) {
      outerRef.current.scale.setScalar(active ? 1 + pulse * 0.08 : 1);
    }
  });
  return (
    <group position={position}>
      <mesh ref={outerRef} position={[0, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.92, 48]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.8 : 0.4} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh ref={innerRef} position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.7, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      {/* Pillar de luz */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 3, 24, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.18 : 0.08} side={THREE.DoubleSide} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Camera follow ──────────────────────────────────────────────────────────
function CameraFollow({ playerPos }: { playerPos: React.MutableRefObject<THREE.Vector3> }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 4, 6));
  const lookAt = useRef(new THREE.Vector3(0, 1, 0));
  const introT = useRef(0);

  useFrame((_, dt) => {
    introT.current += dt;
    const intro = Math.min(introT.current / 1.6, 1);
    const introEase = 1 - Math.pow(1 - intro, 3);

    // Posição alvo da câmara
    const wantedPos = new THREE.Vector3(
      playerPos.current.x * 0.35,
      4.2 + (1 - introEase) * 4,
      playerPos.current.z + 5.5
    );
    const wantedLook = new THREE.Vector3(
      playerPos.current.x * 0.5,
      0.9,
      playerPos.current.z - 1
    );

    const k = 1 - Math.exp(-dt * 4);
    targetPos.current.lerp(wantedPos, k);
    lookAt.current.lerp(wantedLook, k);
    camera.position.copy(targetPos.current);
    camera.lookAt(lookAt.current);
  });
  return null;
}

// ─── Player Controller (física + zonas) ──────────────────────────────────────
const ZONES = [
  { id: "skills" as const, pos: [0, 0, -1.7] as [number, number, number], color: "#6366F1" },
  { id: "projects" as const, pos: [2.4, 0, -1.7] as [number, number, number], color: "#F59E0B" },
  { id: "about" as const, pos: [0, 0, 2.8] as [number, number, number], color: "#C084FC" },
  { id: "contact" as const, pos: [-4.4, 0, -1.0] as [number, number, number], color: "#10B981" },
  { id: "contact" as const, pos: [4.4, 0, -1.0] as [number, number, number], color: "#10B981" },
];

const BOUNDS = { minX: -5.8, maxX: 5.8, minZ: -1.9, maxZ: 4.2 };

function PlayerController({
  posRef, movingRef, setNearby,
}: {
  posRef: React.MutableRefObject<THREE.Vector3>;
  movingRef: React.MutableRefObject<boolean>;
  setNearby: (id: NonNullable<Section> | null) => void;
}) {
  const keys = useKeyState();
  const vel = useRef(new THREE.Vector3(0, 0, 0));
  const lastNearby = useRef<NonNullable<Section> | null>(null);
  const SPEED = 4.8;
  const ACCEL = 28;
  const DECEL = 18;
  const RANGE = 1.4;

  useFrame((_, dt) => {
    const k = keys.current;
    let dx = 0, dz = 0;
    if (k["w"] || k["arrowup"]) dz -= 1;
    if (k["s"] || k["arrowdown"]) dz += 1;
    if (k["a"] || k["arrowleft"]) dx -= 1;
    if (k["d"] || k["arrowright"]) dx += 1;
    const hasInput = dx !== 0 || dz !== 0;

    if (hasInput) {
      const len = Math.hypot(dx, dz);
      dx /= len; dz /= len;
      vel.current.x = THREE.MathUtils.lerp(vel.current.x, dx * SPEED, Math.min(1, ACCEL * dt));
      vel.current.z = THREE.MathUtils.lerp(vel.current.z, dz * SPEED, Math.min(1, ACCEL * dt));
    } else {
      vel.current.x = THREE.MathUtils.lerp(vel.current.x, 0, Math.min(1, DECEL * dt));
      vel.current.z = THREE.MathUtils.lerp(vel.current.z, 0, Math.min(1, DECEL * dt));
    }

    posRef.current.x += vel.current.x * dt;
    posRef.current.z += vel.current.z * dt;

    // Bounds — clamp e bloquear booth (player não sobe à mesa)
    posRef.current.x = THREE.MathUtils.clamp(posRef.current.x, BOUNDS.minX, BOUNDS.maxX);
    // Bloquear acesso à booth (z menor que -2.0 só se encostar à zona "skills" / "projects")
    if (posRef.current.z < BOUNDS.minZ) posRef.current.z = BOUNDS.minZ;
    if (posRef.current.z > BOUNDS.maxZ) posRef.current.z = BOUNDS.maxZ;

    movingRef.current = vel.current.length() > 0.3;

    // Detectar zona próxima
    let nearest: NonNullable<Section> | null = null;
    let nearestDist = RANGE;
    for (const z of ZONES) {
      const d = Math.hypot(posRef.current.x - z.pos[0], posRef.current.z - z.pos[2]);
      if (d < nearestDist) { nearestDist = d; nearest = z.id; }
    }
    if (nearest !== lastNearby.current) {
      lastNearby.current = nearest;
      setNearby(nearest);
    }
  });

  return null;
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene({
  setNearby, active, nearby,
  posRef, movingRef,
  hovered, setHovered,
}: {
  setNearby: (id: NonNullable<Section> | null) => void;
  active: Section;
  nearby: NonNullable<Section> | null;
  posRef: React.MutableRefObject<THREE.Vector3>;
  movingRef: React.MutableRefObject<boolean>;
  hovered: NonNullable<Section> | null;
  setHovered: (id: NonNullable<Section> | null) => void;
}) {
  const { gl } = useThree();
  const over = (id: NonNullable<Section>) => () => { setHovered(id); gl.domElement.style.cursor = "pointer"; };
  const out = () => { setHovered(null); gl.domElement.style.cursor = "default"; };

  // Click direto nos objects também abre — passamos via useState do parent
  const triggerClick = (s: NonNullable<Section>) => {
    // Usamos um custom event (escutado no main)
    window.dispatchEvent(new CustomEvent("section:open", { detail: s }));
  };

  return (
    <>
      <fog attach="fog" args={["#02010a", 7, 24]} />
      <color attach="background" args={["#02010a"]} />

      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#7c3aed", "#020108", 0.4]} />

      <directionalLight position={[3, 10, 6]} intensity={1.2} color="#ffe5b8" castShadow
        shadow-mapSize={[2048, 2048]} shadow-camera-far={30}
        shadow-camera-left={-10} shadow-camera-right={10}
        shadow-camera-top={10} shadow-camera-bottom={-10}
      />

      <MovingSpot color="#7c3aed" side="L" phase={0} />
      <MovingSpot color="#3b82f6" side="R" phase={Math.PI} />
      <spotLight position={[0, 9, 1.5]} angle={0.5} penumbra={0.5} intensity={70} distance={20} decay={2} color="#F59E0B" target-position={[0, 0.85, -3]} castShadow />
      <pointLight position={[-4, 1.5, 3]} color="#ec4899" intensity={20} distance={9} decay={2} />
      <pointLight position={[4, 1.5, 3]} color="#06b6d4" intensity={20} distance={9} decay={2} />

      <Environment preset="night" />

      <Truss />
      <Smoke />
      <Floor />
      <Booth />

      {/* CDJ esquerdo */}
      <group>
        <CDJ position={[-1.4, 0.95, -3.4]} accent="#ec4899" label="DECK A"
          hot={hovered === "skills"}
          onOver={over("skills")} onOut={out}
          onClick={() => triggerClick("skills")}
        />
      </group>
      {/* DJM (central) → SKILLS */}
      <group position={[0, 0.95, -3.4]}>
        <DJM
          hot={hovered === "skills" || active === "skills"}
          onOver={over("skills")} onOut={out}
          onClick={() => triggerClick("skills")}
        />
      </group>
      {/* CDJ direito */}
      <group>
        <CDJ position={[1.4, 0.95, -3.4]} accent="#06b6d4" label="DECK B"
          hot={hovered === "skills"}
          onOver={over("skills")} onOut={out}
          onClick={() => triggerClick("skills")}
        />
      </group>

      {/* Laptop em stand → PROJECTS (lateral, à direita da booth) */}
      <LaptopStand
        position={[2.4, 0.94, -3.4]}
        hot={hovered === "projects" || active === "projects"}
        onOver={over("projects")} onOut={out}
        onClick={() => triggerClick("projects")}
      />

      {/* Speakers nos lados */}
      <SpeakerStack position={[-4.8, 0, -2.5]} side="L"
        hot={hovered === "contact" || active === "contact"}
        onOver={over("contact")} onOut={out}
        onClick={() => triggerClick("contact")}
      />
      <SpeakerStack position={[4.8, 0, -2.5]} side="R"
        hot={hovered === "contact" || active === "contact"}
        onOver={over("contact")} onOut={out}
        onClick={() => triggerClick("contact")}
      />

      {/* Lounge / About — sofá simples atrás do player */}
      <group position={[0, 0, 3.4]}>
        {/* Sofá */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[2.6, 0.4, 0.85]} />
          <meshStandardMaterial color="#3a1d4d" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.65, -0.3]} castShadow>
          <boxGeometry args={[2.6, 0.55, 0.25]} />
          <meshStandardMaterial color="#4a2860" roughness={0.8} />
        </mesh>
        {/* Mesa do sofá */}
        <mesh position={[0, 0.25, 0.7]} castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 24]} />
          <meshStandardMaterial color="#1a1a22" metalness={0.5} roughness={0.5} />
        </mesh>
        <HoverTag visible={hovered === "about" || active === "about"} text="ABOUT ME" color="#C084FC" y={1.6} />
      </group>

      {/* Crowd na pista */}
      <Crowd />

      {/* Player (DJ) */}
      <Player posRef={posRef} movingRef={movingRef} />

      {/* Interaction Zones */}
      {ZONES.map((z, i) => (
        <InteractionZone key={i} position={z.pos} color={z.color} label={z.id} active={nearby === z.id} />
      ))}

      <ContactShadows position={[0, 0.005, 0]} opacity={0.55} scale={20} blur={2.5} far={5} />

      <PlayerController posRef={posRef} movingRef={movingRef} setNearby={setNearby} />
      <CameraFollow playerPos={posRef} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.85} intensity={1.4} mipmapBlur radius={0.8} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

// ─── Painéis de conteúdo ─────────────────────────────────────────────────────
const PANELS: Record<NonNullable<Section>, { title: string; eyebrow: string; body: React.ReactNode }> = {
  projects: {
    title: "Selected Work", eyebrow: "PROJECTS / 2024 — 2026",
    body: (
      <div className="space-y-2.5">
        {[
          { name: "AgendaDJ", desc: "Mobile platform for DJs in Mozambique", tags: ["Expo", "Supabase", "AI"], status: "In production" },
          { name: "Library DJ", desc: "Desktop app — DJ library organizer", tags: ["Tauri", "React", "Rust"], status: "v0.3 shipped" },
          { name: "GabineteOS", desc: "Accounting SaaS — Mozambique", tags: ["NestJS", "Next.js"], status: "Backend live" },
          { name: "MUSICTOLEGAL", desc: "DJ library scanner + purchase list", tags: ["Python", "Flask", "AcoustID"], status: "Internal tool" },
          { name: "TxxTxxTxx", desc: "Private group app — xitique, trips, AI", tags: ["Expo", "InstantDB"], status: "Live" },
          { name: "ClutchUps", desc: "COD wagers webapp — XP & Money", tags: ["Next.js", "Supabase", "Stripe"], status: "Beta" },
        ].map(({ name, desc, tags, status }) => (
          <div key={name} className="group p-4 rounded-xl border transition-all"
            style={{ background: "rgba(245,158,11,0.05)", borderColor: "rgba(245,158,11,0.18)" }}>
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <p className="text-white text-[15px] font-semibold leading-snug">{name}</p>
              <span className="text-[10px] tracking-wider font-semibold whitespace-nowrap" style={{ color: "#F59E0B" }}>{status}</span>
            </div>
            <p className="text-gray-400 text-[13px] leading-snug mb-2">{desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide"
                  style={{ background: "rgba(245,158,11,0.12)", color: "#FCD34D", border: "1px solid rgba(245,158,11,0.18)" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  about: {
    title: "About Me", eyebrow: "WHO / WHAT / WHERE",
    body: (
      <div className="space-y-5">
        <p className="text-gray-300 text-[14px] leading-relaxed">
          Full-stack developer & DJ from <span className="text-white font-semibold">Mozambique</span>, based in <span className="text-white font-semibold">Lisbon</span>.
          I build apps and platforms by day. I play residencies by night. Both feed each other.
        </p>
        <div className="space-y-2">
          {[
            { label: "Currently building", value: "AgendaDJ · Library DJ · GabineteOS" },
            { label: "Stack of choice", value: "Next.js · Expo · Supabase · Three.js" },
            { label: "DJ residencies", value: "Tokyo · Lisboa Rio · Remember · FiestaDura" },
            { label: "Languages", value: "Português · English · A bit of Spanish" },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 rounded-xl"
              style={{ background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.16)" }}>
              <p className="text-[10px] font-bold mb-1 tracking-[0.2em] uppercase" style={{ color: "#C084FC" }}>{label}</p>
              <p className="text-gray-200 text-[13px]">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-gray-500 italic leading-relaxed pt-2 border-t border-white/5">
          &ldquo;Code by day, decks by night — both about reading the room and shipping the moment.&rdquo;
        </p>
      </div>
    ),
  },
  skills: {
    title: "Skills & Stack", eyebrow: "TOOLS / FRAMEWORKS / APIS",
    body: (
      <div className="space-y-5">
        {[
          { cat: "Mobile", level: 90, items: ["React Native", "Expo SDK 55", "TypeScript", "Biometrics", "Push", "EAS Build"] },
          { cat: "Web", level: 92, items: ["Next.js 16", "React 19", "Three.js", "Framer Motion", "Tailwind", "Lenis"] },
          { cat: "Backend", level: 85, items: ["Supabase", "PostgreSQL", "Node.js", "Python", "Edge Functions", "NestJS"] },
          { cat: "AI / APIs", level: 80, items: ["Claude API", "OpenAI", "AcoustID", "MusicBrainz", "Stripe", "RevenueCat"] },
        ].map(({ cat, level, items }) => (
          <div key={cat}>
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase" style={{ color: "#6366F1" }}>{cat}</p>
              <p className="text-[10px] text-gray-500 font-mono">{level}%</p>
            </div>
            <div className="h-[3px] rounded-full mb-2.5 overflow-hidden" style={{ background: "rgba(99,102,241,0.12)" }}>
              <div className="h-full rounded-full" style={{ width: `${level}%`, background: "linear-gradient(90deg, #6366F1, #C084FC)" }} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map(s => (
                <span key={s} className="px-2.5 py-1 text-[11px] rounded-full text-gray-200 font-medium"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.22)" }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  contact: {
    title: "Get in Touch", eyebrow: "FREELANCE / CONSULTING",
    body: (
      <div className="space-y-3">
        <p className="text-gray-400 text-[13px] leading-relaxed mb-4">
          Disponível para <span className="text-white">freelance</span>, <span className="text-white">consultoria</span> e projectos a longo prazo. Mobile, web, backend, AI integrations.
        </p>
        {[
          { icon: "✉", label: "Email", value: "ydagot@gmail.com", href: "mailto:ydagot@gmail.com" },
          { icon: "◉", label: "Instagram", value: "@deejay.dago", href: "https://instagram.com/deejay.dago" },
          { icon: "♪", label: "DJ residencies", value: "Lisbon — Wed/Fri/Sat" },
          { icon: "◐", label: "Location", value: "Lisbon, Portugal" },
        ].map(({ icon, label, value, href }) => {
          const inner = (
            <div className="flex items-start gap-3 p-3.5 rounded-xl group transition-all"
              style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)" }}>
              <span className="text-base mt-0.5" style={{ color: "#10b981" }}>{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5" style={{ color: "#10b981" }}>{label}</p>
                <p className="text-gray-200 text-[13px] truncate">{value}</p>
              </div>
              {href && <span className="text-gray-500 text-xs group-hover:text-emerald-400 transition-colors">↗</span>}
            </div>
          );
          return href ? (
            <a key={label} href={href} target="_blank" rel="noreferrer">{inner}</a>
          ) : (
            <div key={label}>{inner}</div>
          );
        })}
      </div>
    ),
  },
};

// ─── HUD ─────────────────────────────────────────────────────────────────────
function HUD({
  active, setActive, nearby,
}: {
  active: Section; setActive: (s: Section) => void; nearby: NonNullable<Section> | null;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const sections: { id: NonNullable<Section>; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top-left logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 left-6 z-30 pointer-events-none select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ boxShadow: "0 0 12px #F59E0B" }} />
          <span className="text-[10px] tracking-[0.35em] font-bold text-white/80">YD</span>
          <span className="text-[10px] tracking-[0.3em] text-white/40">/ FULL-STACK + DJ</span>
        </div>
      </motion.div>

      {/* Top-right clock + status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
        className="absolute top-6 right-6 z-30 pointer-events-none select-none flex items-center gap-4 font-mono text-[10px] tracking-[0.2em]"
      >
        <span className="text-white/40">LISBOA</span>
        <span className="text-white/80">{time}</span>
        <span className="px-2 py-1 rounded-full font-bold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
          ● LIVE
        </span>
      </motion.div>

      {/* Hero center */}
      <AnimatePresence mode="wait">
        {!active && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="absolute inset-x-0 top-[12vh] z-20 flex flex-col items-center text-center pointer-events-none select-none px-6"
          >
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
              className="text-[10px] tracking-[0.4em] font-semibold mb-3 text-amber-400/80"
            >
              YURI DAGOT — INTERACTIVE PORTFOLIO
            </motion.span>
            <h1
              className="font-black tracking-tight leading-[0.85] text-white"
              style={{
                fontSize: "clamp(40px, 8vw, 110px)",
                textShadow: "0 0 60px rgba(245,158,11,0.35), 0 0 120px rgba(124,58,237,0.25)",
                letterSpacing: "-0.04em",
              }}
            >
              The <span style={{
                background: "linear-gradient(90deg, #F59E0B, #C084FC, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Booth</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-4 max-w-md text-[13px] md:text-[14px] text-white/55 leading-relaxed"
            >
              Walk around. Stand on a glow ring. Open the section.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls hint (canto baixo esquerdo) */}
      <AnimatePresence>
        {!active && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="absolute bottom-7 left-6 z-30 pointer-events-none select-none"
          >
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl"
              style={{
                background: "rgba(8,6,22,0.7)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
              <div className="flex items-center gap-1.5">
                {["W", "A", "S", "D"].map((k) => (
                  <kbd key={k} className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white/90"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>{k}</kbd>
                ))}
              </div>
              <span className="text-[11px] text-white/50 tracking-wide">to move · </span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white/90"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>E</kbd>
              <span className="text-[11px] text-white/50 tracking-wide">to interact</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom nav pills (também é shortcut directo) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-7 inset-x-0 z-30 flex justify-center pointer-events-none"
      >
        <div className="flex items-center gap-1 p-1.5 rounded-full pointer-events-auto"
          style={{
            background: "rgba(8, 6, 22, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.15)",
          }}>
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            const c = ACCENT[id];
            return (
              <button
                key={id}
                onClick={() => setActive(isActive ? null : id)}
                className="relative px-4 md:px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-colors"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.6)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${c}25`, border: `1px solid ${c}55`, boxShadow: `0 0 24px ${c}40` }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full" style={{ background: c, boxShadow: isActive ? `0 0 8px ${c}` : "none" }} />
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Prompt de interacção (quando perto de uma zona) */}
      <AnimatePresence>
        {nearby && !active && (
          <motion.button
            key={nearby}
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onClick={() => setActive(nearby)}
            className="absolute left-1/2 -translate-x-1/2 bottom-32 z-40 group cursor-pointer"
            style={{
              padding: "14px 22px",
              borderRadius: 18,
              background: "rgba(8,6,22,0.92)",
              backdropFilter: "blur(20px)",
              border: `1.5px solid ${ACCENT[nearby]}80`,
              boxShadow: `0 0 50px ${ACCENT[nearby]}55, 0 20px 60px rgba(0,0,0,0.6)`,
            }}
          >
            <div className="flex items-center gap-3">
              <kbd className="px-2 py-1 rounded text-[12px] font-black"
                style={{
                  background: ACCENT[nearby],
                  color: "#000",
                  boxShadow: `0 0 16px ${ACCENT[nearby]}99`,
                }}>E</kbd>
              <span className="text-white text-[14px] font-bold tracking-wide">
                Open <span style={{ color: ACCENT[nearby] }}>{nearby.toUpperCase()}</span>
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Painel lateral ──────────────────────────────────────────────────────────
function SidePanel({ active, onClose }: { active: Section; onClose: () => void }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.aside
          key={active}
          initial={{ x: "100%", opacity: 0.6 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 32 }}
          className="absolute right-0 top-0 h-full z-40 flex flex-col"
          style={{
            width: "clamp(330px, 36vw, 460px)",
            background: "linear-gradient(180deg, rgba(8,6,22,0.92) 0%, rgba(4,3,12,0.97) 100%)",
            backdropFilter: "blur(28px)",
            borderLeft: `1px solid ${ACCENT[active]}30`,
            boxShadow: `-30px 0 90px ${ACCENT[active]}20, inset 1px 0 0 rgba(255,255,255,0.04)`,
          }}
        >
          <div className="flex items-start justify-between px-7 pt-7 pb-5"
            style={{ borderBottom: `1px solid ${ACCENT[active]}1f` }}>
            <div>
              <p className="text-[10px] tracking-[0.3em] font-bold mb-1.5" style={{ color: ACCENT[active] }}>
                {PANELS[active].eyebrow}
              </p>
              <h2 className="text-white text-[26px] font-bold tracking-tight leading-tight">
                {PANELS[active].title}
              </h2>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <span className="text-sm">✕</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-7 py-6 custom-scroll">
            {PANELS[active].body}
          </div>
          <div className="px-7 py-5" style={{ borderTop: `1px solid ${ACCENT[active]}1f` }}>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${ACCENT[active]}50)` }} />
              <span className="text-[10px] tracking-[0.35em] font-bold" style={{ color: `${ACCENT[active]}80` }}>YURI DAGOT</span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${ACCENT[active]}50)` }} />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function DJStudio() {
  const [active, setActive] = useState<Section>(null);
  const [nearby, setNearby] = useState<NonNullable<Section> | null>(null);
  const [hovered, setHovered] = useState<NonNullable<Section> | null>(null);
  const posRef = useRef(new THREE.Vector3(0, 0, 1.5));
  const movingRef = useRef(false);

  useEffect(() => {
    const h = document.documentElement;
    const b = document.body;
    const prevH = h.style.overflow, prevB = b.style.overflow;
    h.style.overflow = "hidden";
    b.style.overflow = "hidden";
    return () => { h.style.overflow = prevH; b.style.overflow = prevB; };
  }, []);

  // Listener para clicks directos em objects (vem do Scene via window event)
  useEffect(() => {
    const handler = (e: Event) => {
      const det = (e as CustomEvent<NonNullable<Section>>).detail;
      if (det) setActive(det);
    };
    window.addEventListener("section:open", handler);
    return () => window.removeEventListener("section:open", handler);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActive(null); return; }
      if (e.key.toLowerCase() === "e" && nearby && !active) {
        setActive(nearby);
        return;
      }
      if (e.key === "1") setActive(active === "projects" ? null : "projects");
      if (e.key === "2") setActive(active === "skills" ? null : "skills");
      if (e.key === "3") setActive(active === "about" ? null : "about");
      if (e.key === "4") setActive(active === "contact" ? null : "contact");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, nearby]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#02010a", overflow: "hidden" }}>
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.10), transparent 60%), radial-gradient(ellipse 60% 80% at 0% 100%, rgba(124,58,237,0.12), transparent 60%), radial-gradient(ellipse 60% 80% at 100% 100%, rgba(59,130,246,0.10), transparent 60%)",
        }}
      />

      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 8, 6], fov: 42, near: 0.1, far: 60 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        style={{ width: "100vw", height: "100vh", position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <Scene
            setNearby={setNearby}
            active={active}
            nearby={nearby}
            posRef={posRef}
            movingRef={movingRef}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Suspense>
      </Canvas>

      <HUD active={active} setActive={setActive} nearby={nearby} />
      <SidePanel active={active} onClose={() => setActive(null)} />
    </div>
  );
}
