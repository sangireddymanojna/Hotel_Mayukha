'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function SparklesBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 35 sparkling particles with deterministic random values
    const generated: Particle[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 98),
      top: Math.floor(Math.random() * 98),
      size: Math.floor(Math.random() * 4) + 2, // 2px to 6px
      duration: Math.floor(Math.random() * 4) + 3, // 3s to 7s
      delay: Math.floor(Math.random() * 5), // 0s to 5s
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient Glowing Orbs */}
      <div className="ambient-gold-orb w-96 h-96 -top-20 -left-20" />
      <div className="ambient-gold-orb w-[30rem] h-[30rem] top-1/2 -right-40" />
      <div className="ambient-gold-orb w-80 h-80 -bottom-20 left-1/3" />

      {/* Floating Sparkle Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-sparkle-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Twinkling Star SVG Icons */}
      {particles.slice(0, 15).map((p) => (
        <div
          key={`star-${p.id}`}
          className="sparkle-star text-mayukha-gold"
          style={{
            left: `${(p.left + 15) % 95}%`,
            top: `${(p.top + 20) % 95}%`,
            animationDuration: `${p.duration + 1}s`,
            animationDelay: `${p.delay + 0.5}s`,
          }}
        >
          <svg className="w-3 h-3 fill-mayukha-gold opacity-75" viewBox="0 0 24 24">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
