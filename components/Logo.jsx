/**
 * Veloce logo. Uses the actual brand PNG asset with a transparent background,
 * extracted from the source design file. This is the ONLY place the logo
 * lives — every appearance imports from here so the mark stays identical.
 *
 * Variants:
 *   - 'nav'    (default): full logo (mark + wordmark), 28px tall
 *   - 'footer':           full logo, 26px tall
 *   - 'mark':             just the mark, no wordmark
 */
export function Logo({ variant = 'nav', href, onClick }) {
  const config = {
    nav:    { height: 40, src: '/veloce-logo.png',  wrapClass: 'logo logo-nav' },
    footer: { height: 36, src: '/veloce-logo.png',  wrapClass: 'logo logo-footer' },
    mark:   { height: 32, src: '/veloce-mark.png',  wrapClass: 'logo logo-mark' },
  }[variant]

  // aspect ratio of the source PNG (960 x 272 for full logo, 1020 x 660 for mark)
  const aspect = variant === 'mark' ? 1020 / 660 : 960 / 272
  const width = Math.round(config.height * aspect)

  const img = (
    <img
      src={config.src}
      alt="Veloce"
      height={config.height}
      width={width}
      className="logo-img"
    />
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={config.wrapClass} aria-label="Veloce, home">
        {img}
      </a>
    )
  }
  return <span className={config.wrapClass}>{img}</span>
}

// Kept for backwards compat with anywhere that imports { LogoMark } — thin wrapper.
export function LogoMark({ size = 24, className = '' }) {
  const aspect = 1020 / 660
  return (
    <img
      src="/veloce-mark.png"
      alt=""
      height={size}
      width={Math.round(size * aspect)}
      className={className}
      aria-hidden="true"
    />
  )
}
