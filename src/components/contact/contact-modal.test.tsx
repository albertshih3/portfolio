import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactModal from './contact-modal'

vi.mock('@/lib/firebase', () => ({ analytics: null }))
vi.mock('firebase/analytics', () => ({ logEvent: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
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

const onClose = vi.fn()

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<{ name: string; email: string; message: string }> = {}
) => {
  const { name = 'Alice Smith', email = 'alice@example.com', message = 'Hello, I would like to connect.' } = overrides
  if (name) await user.type(screen.getByPlaceholderText('Your name'), name)
  if (email) await user.type(screen.getByPlaceholderText('your.email@example.com'), email)
  if (message) await user.type(screen.getByPlaceholderText(/Tell me about/i), message)
}

describe('ContactModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 'email-1' }) }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('visibility', () => {
    it('renders the contact form when isOpen is true', () => {
      render(<ContactModal isOpen onClose={onClose} />)
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('does not render the dialog when isOpen is false', () => {
      render(<ContactModal isOpen={false} onClose={onClose} />)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('form validation', () => {
    it('shows error when name is empty on submit', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(await screen.findByText('Name is required.')).toBeInTheDocument()
    })

    it('shows error when email is empty on submit', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await user.type(screen.getByPlaceholderText('Your name'), 'Alice')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(await screen.findByText('Email is required.')).toBeInTheDocument()
    })

    it('shows error for invalid email format', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await user.type(screen.getByPlaceholderText('Your name'), 'Alice')
      await user.type(screen.getByPlaceholderText('your.email@example.com'), 'notanemail')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument()
    })

    it('shows error when message is empty', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await user.type(screen.getByPlaceholderText('Your name'), 'Alice')
      await user.type(screen.getByPlaceholderText('your.email@example.com'), 'alice@example.com')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(await screen.findByText('Message is required.')).toBeInTheDocument()
    })

    it('shows error when message is shorter than 10 characters', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await fillForm(user, { message: 'Hi' })
      await user.click(screen.getByRole('button', { name: /send message/i }))
      expect(await screen.findByText('Message is too short.')).toBeInTheDocument()
    })
  })

  describe('form submission', () => {
    it('calls /api/send-email with name, email, and message on valid submit', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await fillForm(user)
      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenCalledWith('/api/send-email', expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ name: 'Alice Smith', email: 'alice@example.com', message: 'Hello, I would like to connect.' }),
        }))
      })
    })

    it('calls onClose after a successful submission', async () => {
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await fillForm(user)
      await user.click(screen.getByRole('button', { name: /send message/i }))
      await waitFor(() => expect(onClose).toHaveBeenCalledOnce())
    })

    it('does not call onClose when the API returns an error', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
      const user = userEvent.setup()
      render(<ContactModal isOpen onClose={onClose} />)
      await fillForm(user)
      await user.click(screen.getByRole('button', { name: /send message/i }))
      await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled())
      expect(onClose).not.toHaveBeenCalled()
    })
  })
})
