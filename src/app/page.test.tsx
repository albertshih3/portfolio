import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Home from './page'

vi.mock('@/lib/firebase', () => ({ analytics: null }))
vi.mock('firebase/analytics', () => ({ logEvent: vi.fn() }))
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))
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

const routerReplace = vi.fn()

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(usePathname).mockReturnValue('/')
    vi.mocked(useRouter).mockReturnValue({ replace: routerReplace } as unknown as ReturnType<typeof useRouter>)
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as unknown as ReturnType<typeof useSearchParams>)
  })

  describe('contact modal auto-open', () => {
    it('does not open the contact modal by default', () => {
      render(<Home />)
      expect(screen.queryByRole('dialog', { name: /get in touch/i })).not.toBeInTheDocument()
    })

    it('opens the contact modal when the URL has ?contact=open', () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams('contact=open') as unknown as ReturnType<typeof useSearchParams>
      )
      render(<Home />)
      expect(screen.getByRole('dialog', { name: /get in touch/i })).toBeInTheDocument()
    })

    it('clears the ?contact=open query param after opening the modal', () => {
      vi.mocked(useSearchParams).mockReturnValue(
        new URLSearchParams('contact=open') as unknown as ReturnType<typeof useSearchParams>
      )
      render(<Home />)
      expect(routerReplace).toHaveBeenCalledWith('/', { scroll: false })
    })
  })

  describe('entry points', () => {
    it('the hero CTA links to the Projects route', () => {
      render(<Home />)
      expect(screen.getByRole('link', { name: /see my work/i })).toHaveAttribute('href', '/projects')
    })

    it('renders a dedicated Projects entry point linking to /projects', () => {
      render(<Home />)
      const projectLinks = screen.getAllByRole('link', { name: /projects/i })
      expect(projectLinks.some(link => link.getAttribute('href') === '/projects')).toBe(true)
    })

    it('renders a Writing entry point linking to /blog', () => {
      render(<Home />)
      const writingLinks = screen.getAllByRole('link', { name: /writing/i })
      expect(writingLinks.some(link => link.getAttribute('href') === '/blog')).toBe(true)
    })

    it('does not render the project tabs inline on the home page anymore', () => {
      render(<Home />)
      expect(screen.queryByRole('tablist', { name: /project categories/i })).not.toBeInTheDocument()
    })
  })
})
