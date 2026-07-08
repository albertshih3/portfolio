import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatBar from './chat-bar'

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
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => children,
}))

const mockStreamResponse = (chunks: string[]) => {
  let callCount = 0
  const reads = [
    ...chunks.map((chunk) => ({
      done: false as const,
      value: new TextEncoder().encode(chunk),
    })),
    { done: true as const, value: undefined },
  ]

  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    body: {
      getReader: () => ({
        read: vi.fn().mockImplementation(() => Promise.resolve(reads[callCount++])),
      }),
    },
  }))
}

describe('ChatBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('trigger bar', () => {
    it('renders the floating trigger bar', () => {
      render(<ChatBar isOpen={false} setIsOpen={vi.fn()} />)
      expect(screen.getByPlaceholderText(/ask anything/i)).toBeInTheDocument()
    })

    it('has an Ask button in the trigger bar', () => {
      render(<ChatBar isOpen={false} setIsOpen={vi.fn()} />)
      expect(screen.getByRole('button', { name: /ask/i })).toBeInTheDocument()
    })
  })

  describe('chat panel', () => {
    it('shows the chat panel with correct role when isOpen is true', () => {
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      expect(screen.getByRole('dialog', { name: /ai assistant chat/i })).toBeInTheDocument()
    })

    it('does not show the chat panel when isOpen is false', () => {
      render(<ChatBar isOpen={false} setIsOpen={vi.fn()} />)
      expect(screen.queryByRole('dialog', { name: /ai assistant chat/i })).not.toBeInTheDocument()
    })

    it('has an input field in the panel that accepts text', async () => {
      const user = userEvent.setup()
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      const input = screen.getByPlaceholderText(/ask a question/i)
      await user.type(input, 'What has Albert built?')
      expect(input).toHaveValue('What has Albert built?')
    })

    it('send button is disabled when the panel input is empty', () => {
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled()
    })

    it('send button is enabled when the panel input has text', async () => {
      const user = userEvent.setup()
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      await user.type(screen.getByPlaceholderText(/ask a question/i), 'Hello')
      expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled()
    })
  })

  describe('sending a message', () => {
    it('calls /api/chat with the message on submit', async () => {
      mockStreamResponse(['Hello!'])
      const user = userEvent.setup()
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      await user.type(screen.getByPlaceholderText(/ask a question/i), 'What is Albert building?')
      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(vi.mocked(fetch)).toHaveBeenCalledWith('/api/chat', expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ message: 'What is Albert building?' }),
        }))
      })
    })

    it('displays the AI response in the message list', async () => {
      mockStreamResponse(['AI response here'])
      const user = userEvent.setup()
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      await user.type(screen.getByPlaceholderText(/ask a question/i), 'Hello')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      await screen.findByText('AI response here')
    })

    it('shows an error message when the API call fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
      const user = userEvent.setup()
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      await user.type(screen.getByPlaceholderText(/ask a question/i), 'Hello')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      await screen.findByText(/something went wrong/i)
    })

    it('clears the input after sending a message', async () => {
      mockStreamResponse(['Response'])
      const user = userEvent.setup()
      render(<ChatBar isOpen setIsOpen={vi.fn()} />)
      const input = screen.getByPlaceholderText(/ask a question/i)
      await user.type(input, 'Hello')
      await user.click(screen.getByRole('button', { name: /send message/i }))
      await waitFor(() => expect(input).toHaveValue(''))
    })
  })
})
