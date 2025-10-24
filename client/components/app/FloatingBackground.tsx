import { useEffect, useMemo, useState } from "react";

interface Particle {
  id: number;
  x: number; // 0..100 vw
  y: number; // 0..100 vh
  size: number; // px
  delay: number; // s
  duration: number; // s
  type: "heart" | "sparkle";
  opacity: number; // 0..1
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FloatingBackground() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Trigger re-render client-side for random positions (avoids SSR mismatch)
    setCount(1);
  }, []);

  const particles: Particle[] = useMemo(() => {
    const items: Particle[] = [];
    const total = 22;
    for (let i = 0; i < total; i++) {
      items.push({
        id: i,
        x: random(0, 100),
        y: random(0, 100),
        size: random(8, 20),
        delay: random(0, 6),
        duration: random(8, 18),
        type: Math.random() > 0.5 ? "heart" : "sparkle",
        opacity: random(0.3, 0.8),
      });
    }
    return items;
  }, [count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* soft gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_10%_10%,hsl(var(--petal-200))_0%,transparent_60%),radial-gradient(80%_50%_at_90%_20%,hsl(var(--peach-200))_0%,transparent_60%),radial-gradient(60%_50%_at_50%_100%,hsl(var(--lav-200))_0%,transparent_60%)]" />
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform animate-float"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          {p.type === "heart" ? (
            <Heart size={p.size} />
          ) : (
            <Sparkle size={p.size * 0.8} />
          )}
        </div>
      ))}
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.12))]" />
    </div>
  );
}

function Heart({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_1px_6px_hsla(var(--rose-400),0.25)]"
    >
      <path
        d="M12 21s-6.716-4.418-9.192-7.03C.498 11.498.937 7.5 4.2 6.3 6.4 5.5 8.2 6.7 9 7.6c.8-.9 2.6-2.1 4.8-1.3 3.263 1.2 3.702 5.198 1.392 7.67C18.716 16.582 12 21 12 21z"
        fill="hsl(var(--rose-400))"
      />
    </svg>
  );
}

function Sparkle({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_1px_6px_hsla(var(--gold-400),0.25)]"
    >
      <path
        d="M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8L12 2z"
        fill="hsl(var(--gold-400))"
      />
    </svg>
  );
}
