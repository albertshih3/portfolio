import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectCard from './project-card'

vi.mock('@/lib/firebase', () => ({ analytics: null }))
vi.mock('firebase/analytics', () => ({ logEvent: vi.fn() }))
vi.mock('motion/react', async () => {
  const React = await import('react')
  return {
    motion: {
      div: React.forwardRef<HTMLDivElement, Record<string, unknown>>(
        ({ children, whileHover, whileTap, whileInView, initial, animate, exit, variants, transition, ...props }, ref) =>
          React.createElement('div', { ...props, ref }, children as React.ReactNode)
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  }
})

const baseProps = {
  name: 'Oakland Zoo App',
  description: 'A mobile app for the Oakland Zoo replacing paper workflows.',
  language: 'TypeScript',
  topics: ['react-native', 'firebase', 'expo', 'mobile'],
  url: 'https://example.com',
  githubUrl: 'https://github.com/user/repo',
}

describe('ProjectCard', () => {
  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the project name', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByText('Oakland Zoo App')).toBeInTheDocument()
  })

  it('renders the description when 130 chars or fewer', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByText('A mobile app for the Oakland Zoo replacing paper workflows.')).toBeInTheDocument()
  })

  it('truncates descriptions longer than 130 characters', () => {
    const longDesc = 'A'.repeat(131)
    render(<ProjectCard {...baseProps} description={longDesc} />)
    expect(screen.getByText(`${'A'.repeat(130)}…`)).toBeInTheDocument()
  })

  it('renders the language badge', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders up to 4 topic badges', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByText('react-native')).toBeInTheDocument()
    expect(screen.getByText('firebase')).toBeInTheDocument()
    expect(screen.getByText('expo')).toBeInTheDocument()
    expect(screen.getByText('mobile')).toBeInTheDocument()
  })

  it('shows only the first 4 topics when there are more', () => {
    const props = { ...baseProps, topics: ['a', 'b', 'c', 'd', 'e'] }
    render(<ProjectCard {...props} />)
    expect(screen.queryByText('e')).not.toBeInTheDocument()
  })

  it('calls onProjectClick when the card is clicked', async () => {
    const onProjectClick = vi.fn()
    const user = userEvent.setup()
    render(<ProjectCard {...baseProps} onProjectClick={onProjectClick} />)
    await user.click(screen.getByText('Oakland Zoo App'))
    expect(onProjectClick).toHaveBeenCalledOnce()
  })

  it('opens url in new tab when no onProjectClick is provided', async () => {
    const user = userEvent.setup()
    render(<ProjectCard {...baseProps} />)
    await user.click(screen.getByText('Oakland Zoo App'))
    expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank')
  })

  it('has a GitHub button with the correct aria-label', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByRole('button', { name: 'View Oakland Zoo App on GitHub' })).toBeInTheDocument()
  })

  it('has an external link button with the correct aria-label', () => {
    render(<ProjectCard {...baseProps} />)
    expect(screen.getByRole('button', { name: 'Open Oakland Zoo App' })).toBeInTheDocument()
  })
})
