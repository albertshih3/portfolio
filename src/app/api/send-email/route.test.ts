// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from './route'
import { NextRequest } from 'next/server'

const mockEmailSend = vi.fn()

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: mockEmailSend },
  })),
}))

const makeRequest = (body: Record<string, string>) =>
  new NextRequest('http://localhost/api/send-email', {
    method: 'POST',
    body: JSON.stringify(body),
  })

describe('POST /api/send-email', () => {
  beforeEach(() => {
    vi.stubEnv('RESEND_API_KEY', 'test-resend-key')
    mockEmailSend.mockResolvedValue({ data: { id: 'email-abc123' }, error: null })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  describe('field validation', () => {
    it('returns 400 when name is missing', async () => {
      const res = await POST(makeRequest({ email: 'a@b.com', message: 'Hello' }))
      expect(res.status).toBe(400)
    })

    it('returns 400 when email is missing', async () => {
      const res = await POST(makeRequest({ name: 'Alice', message: 'Hello' }))
      expect(res.status).toBe(400)
    })

    it('returns 400 when message is missing', async () => {
      const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com' }))
      expect(res.status).toBe(400)
    })

    it.each([
      'notanemail',
      'missing-at-sign',
      '@nodomain.com',
      'no-domain@',
      'double@@at.com',
    ])('returns 400 for invalid email: %s', async (email) => {
      const res = await POST(makeRequest({ name: 'Alice', email, message: 'Hello' }))
      expect(res.status).toBe(400)
    })
  })

  describe('HTML escaping', () => {
    it('escapes < > & characters in name and message before sending', async () => {
      await POST(
        makeRequest({
          name: '<script>alert("xss")</script>',
          email: 'test@example.com',
          message: 'Hello <world> & everyone',
        })
      )
      const emailBody: string = mockEmailSend.mock.calls[0][0].html
      expect(emailBody).not.toContain('<script>')
      expect(emailBody).toContain('&lt;script&gt;')
      expect(emailBody).toContain('&lt;world&gt;')
      expect(emailBody).toContain('&amp;')
    })

    it('escapes quotes in user input', async () => {
      await POST(
        makeRequest({
          name: 'Alice "Bob"',
          email: 'test@example.com',
          message: "It's a test",
        })
      )
      const emailBody: string = mockEmailSend.mock.calls[0][0].html
      expect(emailBody).toContain('&quot;')
      expect(emailBody).toContain('&#039;')
    })
  })

  describe('successful send', () => {
    it('calls Resend with the correct recipient', async () => {
      await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello' }))
      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({ to: 'albertshih3@gmail.com' })
      )
    })

    it('returns 200 with the email id', async () => {
      const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello' }))
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.id).toBe('email-abc123')
    })

    it('sets replyTo to the sender email', async () => {
      await POST(makeRequest({ name: 'Alice', email: 'alice@example.com', message: 'Hello' }))
      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({ replyTo: 'alice@example.com' })
      )
    })
  })

  describe('no API key configured', () => {
    it('returns 200 and logs to console instead of sending email', async () => {
      vi.unstubAllEnvs()
      const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello' }))
      expect(res.status).toBe(200)
      expect(mockEmailSend).not.toHaveBeenCalled()
    })
  })
})
