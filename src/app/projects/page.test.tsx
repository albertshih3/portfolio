import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Projects from './page'

vi.mock('@/lib/firebase', () => ({ analytics: null }))
vi.mock('firebase/analytics', () => ({ logEvent: vi.fn() }))
vi.mock('next/navigation', () => ({ usePathname: vi.fn(() => '/projects') }))
vi.mock('next/link', async () => {
  const React = await import('react')
  return {
    default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
      React.createElement('a', { href, ...props }, children),
  }
})
vi.mock('next/image', async () => {
  const React = await import('react')
  return {
    default: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) =>
      React.createElement('img', { src, alt, ...props }),
  }
})
vi.mock('motion/react', async () => {
  const React = await import('react')
  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) =>
          React.forwardRef<HTMLElement, Record<string, unknown>>(
            ({ children, whileHover, whileTap, whileInView, initial, animate, exit, variants, transition, ...props }, ref) =>
              React.createElement(tag, { ...props, ref }, children as React.ReactNode)
          ),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

describe('Projects page', () => {
  it('renders the project category tabs with Professional Work active by default', () => {
    render(<Projects />)
    const tab = screen.getByRole('tab', { name: 'Professional Work' })
    expect(tab).toHaveAttribute('aria-selected', 'true')
  })

  it('pairs each tab with its tabpanel via aria-controls/id', () => {
    render(<Projects />)
    const activeTab = screen.getByRole('tab', { name: 'Professional Work' })
    const panel = screen.getByRole('tabpanel')
    expect(activeTab.getAttribute('aria-controls')).toBe(panel.getAttribute('id'))
  })

  it('only the active tab is in the tab order; inactive tabs are tabIndex -1', () => {
    render(<Projects />)
    expect(screen.getByRole('tab', { name: 'Professional Work' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Personal' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tab', { name: 'Academic' })).toHaveAttribute('tabindex', '-1')
  })

  it('moves the active tab with the right arrow key', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    screen.getByRole('tab', { name: 'Professional Work' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Personal' })).toHaveFocus()
    expect(screen.getByRole('tab', { name: 'Personal' })).toHaveAttribute('aria-selected', 'true')
  })

  it('wraps from the last tab to the first with the right arrow key', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    screen.getByRole('tab', { name: 'Academic' }).focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Professional Work' })).toHaveFocus()
  })

  describe('category framing', () => {
    it('shows framing copy for Professional Work by default', () => {
      render(<Projects />)
      expect(screen.getByText(/production/i)).toBeInTheDocument()
    })

    it('shows different framing copy after switching to Personal', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('tab', { name: 'Personal' }))
      expect(screen.queryByText(/production/i)).not.toBeInTheDocument()
      expect(screen.getByText(/wouldn't leave me alone/i)).toBeInTheDocument()
    })

    it('shows different framing copy after switching to Academic', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      await user.click(screen.getByRole('tab', { name: 'Academic' }))
      expect(screen.getByText(/capstone research/i)).toBeInTheDocument()
    })
  })
})
