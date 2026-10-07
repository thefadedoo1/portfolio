import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { profile } from '../data/profile';
const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
];
export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 30);
      let current = 'home';
      for (const [id] of [...links].sort(
        (a, b) =>
          (document.getElementById(a[0])?.offsetTop ?? 0) -
          (document.getElementById(b[0])?.offsetTop ?? 0),
      )) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? 999) < 180) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    scroll();
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [open]);
  useEffect(() => {
    const media = matchMedia('(min-width: 901px)');
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Nitin Kaundal home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            nk<span>.</span>
          </span>
          <span className="brand-name">Nitin Kaundal</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([id, label]) => (
            <a
              key={id}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
              href={`#${id}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="button small nav-resume" href={profile.resume} download>
            <Download size={14} /> Resume
          </a>
          <button
            ref={button}
            className="icon-button menu-button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            {links.map(([id, label]) => (
              <a
                href={`#${id}`}
                key={id}
                onClick={() => setOpen(false)}
                aria-current={active === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
            <a href={profile.resume} download onClick={() => setOpen(false)}>
              Download resume
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
