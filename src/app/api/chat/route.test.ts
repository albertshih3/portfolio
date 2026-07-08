// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from './route'
import { NextRequest } from 'next/server'

const mockGenerateContentStream = vi.fn()

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: { generateContentStream: mockGenerateContentStream },
  })),
}))

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.stubEnv('GEMINI_API_KEY', 'test-key')
    mockGenerateContentStream.mockResolvedValue(
      (async function* () {
        yield { text: 'Hello' }
        yield { text: ' world' }
      })()
    )
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('returns 400 when message is missing', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBe('Message is required')
  })

  it('returns 500 when GEMINI_API_KEY is not set', async () => {
    vi.unstubAllEnvs()
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })

  it('calls generateContentStream with the stable model (no preview flag)', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })
    await POST(req)
    expect(mockGenerateContentStream).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'gemini-2.5-flash-lite' })
    )
  })

  it('does not use urlContext tool (prevents URL-fetch errors surfacing to users)', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })
    await POST(req)
    const call = mockGenerateContentStream.mock.calls[0][0]
    const tools: unknown[] = call.config?.tools ?? []
    const hasUrlContext = tools.some(
      (t) => t !== null && typeof t === 'object' && 'urlContext' in (t as object)
    )
    expect(hasUrlContext).toBe(false)
  })

  it('passes the user message in the content payload', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'What has Albert built?' }),
    })
    await POST(req)
    expect(mockGenerateContentStream).toHaveBeenCalledWith(
      expect.objectContaining({
        contents: expect.arrayContaining([
          expect.objectContaining({
            role: 'user',
            parts: expect.arrayContaining([
              expect.objectContaining({ text: 'What has Albert built?' }),
            ]),
          }),
        ]),
      })
    )
  })

  it('returns a text/plain streaming response', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })
    const res = await POST(req)
    expect(res.headers.get('Content-Type')).toBe('text/plain')
  })

  it('streams all model chunks to the response body', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })
    const res = await POST(req)
    const text = await res.text()
    expect(text).toBe('Hello world')
  })

  it('skips chunks that have no text property', async () => {
    mockGenerateContentStream.mockResolvedValue(
      (async function* () {
        yield { text: 'Real' }
        yield {}
        yield { text: ' content' }
      })()
    )
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    })
    const res = await POST(req)
    expect(await res.text()).toBe('Real content')
  })
})
