import { SOC2_URL, ext } from '@/lib/siteConfig';

// Trust badge for Veloce's SOC 2 Type II report, linking to the AICPA's SOC documentation.
// Drawn in-house: the round AICPA SOC mark may only be used from the official file
// supplied under the AICPA's licence.
export default function Soc2Badge({ tone = 'light', className = '' }) {
  return (
    <a
      className={`soc2 soc2-${tone} ${className}`}
      href={SOC2_URL}
      {...ext}
      aria-label="SOC 2 Type II compliant. Read about SOC 2 on the AICPA website"
    >
      <span className="soc2-seal" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 2.8 19 5.6v5.6c0 4.5-2.9 8.4-7 9.9-4.1-1.5-7-5.4-7-9.9V5.6z" fill="currentColor" opacity=".16" />
          <path d="M12 2.8 19 5.6v5.6c0 4.5-2.9 8.4-7 9.9-4.1-1.5-7-5.4-7-9.9V5.6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8.6 12.2l2.3 2.3 4.5-4.7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="soc2-t" aria-hidden="true"><b>SOC 2 Type II</b><small>Compliant</small></span>
    </a>
  );
}
