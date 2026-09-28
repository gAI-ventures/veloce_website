// Inline SVG icons. Stroke icons use currentColor so they follow text colour.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };

const paths = {
  phone: <path {...S} d="M6.6 3.5h2.6l1.4 4-2 1.4a11 11 0 0 0 6.5 6.5l1.4-2 4 1.4v2.6A2 2 0 0 1 18.5 21 15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z" />,
  chat: (
    <>
      <path {...S} d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5z" />
      <path {...S} d="M8.5 8.5h7M8.5 11.5h4.5" />
    </>
  ),
  user: (
    <>
      <circle {...S} cx="12" cy="8" r="3.8" />
      <path {...S} d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  desk: <path {...S} d="M3 10h18v3H3zM5 13v7M19 13v7M9 10V6h6v4" />,
  star: <path {...S} d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" />,
  check: <path {...S} strokeWidth="2" d="M5 12.5l4.5 4.5L19 7.5" />,
  alert: (
    <>
      <path {...S} strokeWidth="1.8" d="M12 3.5l9.5 16.5h-19z" />
      <path {...S} strokeWidth="1.8" d="M12 10v4.5M12 17.2v.3" />
    </>
  ),
  plus: <path {...S} strokeWidth="1.8" d="M12 5v14M5 12h14" />,
  menu: <path {...S} strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...S} strokeWidth="1.8" d="M6 6l12 12M18 6L6 18" />,
  trend: <path {...S} strokeWidth="1.8" d="M3.5 17l6-6 4 4 7-7.5M15 7.5h5.5V13" />,
  cal: (
    <>
      <rect {...S} x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path {...S} d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  arrow: <path {...S} strokeWidth="1.8" d="M5 12h13M13 7l5 5-5 5" />,
};

export function Icon({ name, className, size }) {
  return (
    <svg viewBox="0 0 24 24" className={className} width={size} height={size} aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

// The Veloce mark, as used on veloce7.com: two trailing chevrons and a heavier lead.
export function Mark({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.2 11.6 10.1 20 6.2 28.4" strokeWidth="3.4" opacity=".5" />
        <path d="M14 10.8 18.2 20 14 29.2" strokeWidth="3.7" opacity=".7" />
        <path d="M23.4 6.6 32.8 20 23.4 33.4" strokeWidth="5.6" />
      </g>
    </svg>
  );
}

export function Person({ className }) {
  return (
    <svg viewBox="0 0 40 64" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="12" r="10" fill="currentColor" />
      <path fill="currentColor" d="M4 62V38c0-8.8 7.2-16 16-16s16 7.2 16 16v24z" />
    </svg>
  );
}
