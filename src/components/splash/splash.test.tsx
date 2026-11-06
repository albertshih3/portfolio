import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Splash from './splash'

vi.mock('motion/react', async () => {
  const React = await import('react')
  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) =>
          React.forwardRef<HTMLElement, Record<string, unknown>>(
            ({ children, initial, animate, exit, transition, ...props }, ref) =>
              React.createElement(tag, { ...props, ref }, children as React.ReactNode)
          ),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

const setReducedMotion = (matches: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('Splash', () => {
  beforeEach(() => {
    sessionStorage.clear()
    setReducedMotion(false)
  })

  it('renders the splash overlay on first visit', () => {
    render(<Splash />)
    expect(screen.getByTestId('splash')).toBeInTheDocument()
  })

  it('does not render when prefers-reduced-motion is set', () => {
    setReducedMotion(true)
    render(<Splash />)
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument()
  })

  it('does not render when the session has already seen the splash', () => {
    sessionStorage.setItem('splash-seen', '1')
    render(<Splash />)
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument()
  })

  it('marks the session as seen so a remount does not show it again', () => {
    const { unmount } = render(<Splash />)
    expect(screen.getByTestId('splash')).toBeInTheDocument()
    unmount()
    render(<Splash />)
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument()
  })

  it('dismisses when clicked', async () => {
    const user = userEvent.setup()
    render(<Splash />)
    await user.click(screen.getByTestId('splash'))
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument()
  })

  it('dismisses on keydown', async () => {
    const user = userEvent.setup()
    render(<Splash />)
    await user.keyboard('{Escape}')
    expect(screen.queryByTestId('splash')).not.toBeInTheDocument()
  })
})
