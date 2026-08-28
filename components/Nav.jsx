'use client'

import { Logo } from './Logo'
import { useStickyNav } from '@/hooks/useStickyNav'
import { DEMO_URL, LOGIN_URL } from '@/lib/siteConfig'

export default function Nav() {
  const scrolled = useStickyNav()

  const scrollToContact = (event) => {
    const contactSection = document.getElementById('contact')
    if (!contactSection) return

    event.preventDefault()
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    contactSection.scrollIntoView({ behavior, block: 'start' })
    if (window.location.hash !== '#contact') {
      window.history.pushState(null, '', '#contact')
    }
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <Logo variant="nav" href="#top" />
        <nav className="nav-links" aria-label="Primary">
          <a href="#how">How it works</a>
          <a href="#agents">Agents</a>
          <a href="#contact" onClick={scrollToContact}>Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="nav-login" href={LOGIN_URL}>Log in</a>
          <a className="nav-cta" href={DEMO_URL}>Book a demo</a>
        </div>
      </div>
    </header>
  )
}
