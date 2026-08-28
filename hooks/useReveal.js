'use client'

import { useEffect, useRef } from 'react'

/**
 * Adds an "in" class when the ref'd element scrolls into view.
 * Use on any element with the CSS class `.reveal` or `.stagger`.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
