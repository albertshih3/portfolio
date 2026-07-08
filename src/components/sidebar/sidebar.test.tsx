import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import Sidebar from './sidebar'

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }))
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
vi.mock('@/components/theme/theme-toggle', async () => {
  const React = await import('react')
  return {
    default: () => React.createElement('button', { 'aria-label': 'Toggle theme' }, 'Toggle'),
  }
})

// The Sidebar renders both a desktop sidebar and a mobile sidebar at all times,
// so all nav items appear twice in the DOM. Helpers handle this by asserting on
// all instances rather than expecting exactly one.
const allLinks = (name: RegExp) => screen.getAllByRole('link', { name })
const allButtons = (name: RegExp) => screen.getAllByRole('button', { name })

describe('Sidebar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/')
  })

  describe('navigation items', () => {
    it('renders the Home navigation link', () => {
      render(<Sidebar />)
      expect(allLinks(/home/i).length).toBeGreaterThan(0)
    })

    it('Home link points to /', () => {
      render(<Sidebar />)
      allLinks(/home/i).forEach(link => expect(link).toHaveAttribute('href', '/'))
    })

    it('renders the About navigation link', () => {
      render(<Sidebar />)
      expect(allLinks(/about/i).length).toBeGreaterThan(0)
    })

    it('About link points to /about', () => {
      render(<Sidebar />)
      allLinks(/about/i).forEach(link => expect(link).toHaveAttribute('href', '/about'))
    })

    it('Contact is a button, not a link', () => {
      render(<Sidebar />)
      expect(screen.queryAllByRole('link', { name: /contact/i })).toHaveLength(0)
      expect(allButtons(/contact/i).length).toBeGreaterThan(0)
    })

    it('calls onContactClick when a Contact button is clicked', async () => {
      const onContactClick = vi.fn()
      const user = userEvent.setup()
      render(<Sidebar onContactClick={onContactClick} />)
      await user.click(allButtons(/contact/i)[0])
      expect(onContactClick).toHaveBeenCalledOnce()
    })
  })

  describe('social links', () => {
    it('renders the GitHub social link', () => {
      render(<Sidebar />)
      expect(allLinks(/github/i).length).toBeGreaterThan(0)
    })

    it('GitHub links point to github.com/albertshih3', () => {
      render(<Sidebar />)
      allLinks(/github/i).forEach(link =>
        expect(link).toHaveAttribute('href', 'https://github.com/albertshih3')
      )
    })

    it('renders the LinkedIn social link', () => {
      render(<Sidebar />)
      expect(allLinks(/linkedin/i).length).toBeGreaterThan(0)
    })

    it('LinkedIn links point to linkedin.com/in/albertshih3', () => {
      render(<Sidebar />)
      allLinks(/linkedin/i).forEach(link =>
        expect(link).toHaveAttribute('href', 'https://linkedin.com/in/albertshih3')
      )
    })

    it('renders the Resume social link', () => {
      render(<Sidebar />)
      expect(allLinks(/resume/i).length).toBeGreaterThan(0)
    })
  })

  describe('active state', () => {
    it('marks Home links as current page when on /', () => {
      vi.mocked(usePathname).mockReturnValue('/')
      render(<Sidebar />)
      allLinks(/home/i).forEach(link =>
        expect(link).toHaveAttribute('aria-current', 'page')
      )
    })

    it('marks About links as current page when on /about', () => {
      vi.mocked(usePathname).mockReturnValue('/about')
      render(<Sidebar />)
      allLinks(/about/i).forEach(link =>
        expect(link).toHaveAttribute('aria-current', 'page')
      )
    })

    it('does not mark Home as current when on /about', () => {
      vi.mocked(usePathname).mockReturnValue('/about')
      render(<Sidebar />)
      allLinks(/home/i).forEach(link =>
        expect(link).not.toHaveAttribute('aria-current', 'page')
      )
    })
  })
})
