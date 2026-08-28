import { Logo } from './Logo'

const PRODUCT = [
  { href: '#how', label: 'How it works' },
  { href: '#agents', label: 'Agents' },
  { href: '#contact', label: 'Pricing' },
  { href: '#contact', label: 'Integrations' },
]

const COMPANY = [
  { href: 'mailto:sooraj@gai.ventures', label: 'Contact' },
  { href: '#contact', label: 'Book a demo' },
]

const LEGAL = [
  { href: 'mailto:sooraj@gai.ventures', label: 'Privacy' },
  { href: 'mailto:sooraj@gai.ventures', label: 'Terms' },
  { href: 'mailto:sooraj@gai.ventures', label: 'Data processing' },
  { href: 'mailto:sooraj@gai.ventures', label: 'Security' },
]

function Column({ title, items }) {
  return (
    <div className="foot-col">
      <h5>{title}</h5>
      <ul>
        {items.map((it) => (
          <li key={it.label}>
            <a href={it.href}>{it.label}</a>
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
              The AI operating layer for hospitality. Answers your phones, calls your in-house guests, and gives you one place to run the operation from.
            </p>
            <div className="foot-meta">Built by gAI Ventures</div>
          </div>
          <Column title="Product" items={PRODUCT} />
          <Column title="Company" items={COMPANY} />
          <Column title="Legal" items={LEGAL} />
        </div>
        <div className="foot-bottom">
          <div>© 2026 gAI Ventures</div>
          <div>sooraj@gai.ventures</div>
        </div>
      </div>
    </footer>
  )
}
