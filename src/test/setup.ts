import '@testing-library/jest-dom'
import { vi } from 'vitest'

// jsdom doesn't implement scrollIntoView (guard against node environment in API route tests)
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
}

// jsdom doesn't implement matchMedia (used for prefers-reduced-motion checks)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}
