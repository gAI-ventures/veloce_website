'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import Logo from './Logo';
import { DEMO_URL, LOGIN_URL, ext } from '@/lib/siteConfig';

const SECTIONS = [
  { href: '#problem', label: 'Why it matters' },
  { href: '#helps', label: 'How it helps' },
  { href: '#gains', label: 'Your gains' },
  { href: '#faq', label: 'FAQ' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${open ? 'is-open' : ''}`}>
      <div className="nav-bar">
        <Logo />
        <nav aria-label="Main" className="nav-links">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href}>{s.label}</a>
          ))}
        </nav>
        <div className="nav-end">
          <a className="btn btn-ghost btn-sm" href={LOGIN_URL}>Log in</a>
          <a className="btn btn-primary btn-sm" href={DEMO_URL} {...ext}>Book a call</a>
        </div>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {SECTIONS.map((s) => (
            <a key={s.href} href={s.href} onClick={() => setOpen(false)}>{s.label}</a>
          ))}
        </nav>
        <div className="mobile-cta">
          <a className="btn btn-primary" href={DEMO_URL} {...ext} onClick={() => setOpen(false)}>Book a 30-minute call</a>
          <a className="btn btn-ghost" href={LOGIN_URL}>Log in</a>
        </div>
      </div>
    </header>
  );
}
