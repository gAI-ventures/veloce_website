// The Veloce logo for light backgrounds (mark + wordmark), from the brand asset.
const RATIO = 1360 / 352;

export default function Logo({ height = 40, className = '' }) {
  return (
    <a className={`brand ${className}`} href="#top" aria-label="Veloce, back to top">
      <img src="/veloce-logo-light.png" alt="Veloce" height={height} width={Math.round(height * RATIO)} />
    </a>
  );
}
