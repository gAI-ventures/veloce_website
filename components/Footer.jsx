import { Logo } from './Logo'
import { CONTACT_URL, DEMO_URL } from '@/lib/siteConfig'

const PRODUCT = [
  { href: '#how', label: 'How it works' },
  { href: '#agents', label: 'Agents' },
  { href: '#contact', label: 'Pricing' },
  { href: '#contact', label: 'Integrations' },
]

const COMPANY = [
  { href: CONTACT_URL, label: 'Contact' },
  { href: DEMO_URL, label: 'Book a demo' },
]

const LEGAL = [
  { href: CONTACT_URL, label: 'Privacy' },
  { href: CONTACT_URL, label: 'Terms' },
  { href: CONTACT_URL, label: 'Data processing' },
  { href: CONTACT_URL, label: 'Security' },
]

function Column({ title, items }) {
  return (
    <div className="foot-col">
      <h5>{title}</h5>
      <ul>
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.href === CONTACT_URL ? '_blank' : undefined}
              rel={it.href === CONTACT_URL ? 'noreferrer' : undefined}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand-col">
            <Logo variant="footer" />
            <p>
              The AI ops layer for hospitality. Answers your phones, calls your in-house guests, and gives you one place to run the operation from.
            </p>
            <div className="foot-meta">Built by gAI Ventures</div>
          </div>
          <Column title="Product" items={PRODUCT} />
          <Column title="Company" items={COMPANY} />
          <Column title="Legal" items={LEGAL} />
        </div>
        <div className="foot-bottom">
          <div>© 2026 gAI Ventures</div>
          <a href={CONTACT_URL} target="_blank" rel="noreferrer">sooraj@gai.ventures</a>
        </div>
      </div>
    </footer>
  )
}
