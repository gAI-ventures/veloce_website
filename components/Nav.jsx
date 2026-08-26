'use client'

import { Logo } from './Logo'
import { useStickyNav } from '@/hooks/useStickyNav'

export default function Nav() {
  const scrolled = useStickyNav()

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Logo variant="nav" href="#top" />
        <nav className="nav-links" aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#agents">Agents</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-login" href="/login">Log in</a>
          <a className="nav-cta" href="#contact">Book a demo</a>
        </div>
      </div>
    </header>
  )
}
