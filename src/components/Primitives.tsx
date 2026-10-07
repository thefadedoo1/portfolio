import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number}</span> {label}
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nitin on GitHub"
        title="GitHub"
      >
        <Github size={19} />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nitin on LinkedIn"
        title="LinkedIn"
      >
        <Linkedin size={19} />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email Nitin" title="Email">
        <Mail size={19} />
      </a>
    </div>
  );
}
export function Count({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!seen || reduce) return;
    let id = 0;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / 1100, 1);
      setDisplay(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [seen, reduce, value]);
  return (
    <span ref={ref}>
      <span className="sr-only">{value.toFixed(decimals)}</span>
      <span aria-hidden="true">{display.toFixed(decimals)}</span>
    </span>
  );
}
