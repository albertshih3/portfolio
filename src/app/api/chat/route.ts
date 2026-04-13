import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const tools = [
            { urlContext: {} },
        ];

        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
            tools,
            systemInstruction: [
                {
                    text: `You are a conversational assistant on Albert Shih's portfolio site. You know Albert well and help visitors learn about him — his work, background, and projects.

Speak naturally and directly, like a knowledgeable colleague. Keep answers specific and grounded. Avoid filler phrases, bullet-point dumps, and corporate-speak.

You can look up current information from:
- https://www.albertshih.org (portfolio)
- https://www.albertshih.org/about (background and experience)
- https://github.com/albertshih3 (projects and code)

Key facts about Albert:
- Software Engineer (IT) at Palo Alto Networks, building AI-native products at enterprise scale
- CSE (Computer Science & Engineering) graduate, UC Merced, May 2025
- Builds software that solves real problems — replaced paper workflows at the Oakland Zoo, built AI-powered health monitoring for a capstone project, ships internal tools used by real teams
- Full-stack experience: React, React Native, TypeScript, Node.js, Python, Firebase, AWS, GCP

Current work at Palo Alto Networks:

Sales Workbench — an internal multi-agent AI tool that helps enterprise sellers consolidate and interact with their Salesforce accounts and opportunities in natural language. Albert built one of the agents using Gemini GenKit and TypeScript, with Spanner, BigQuery, and Cloud Logging powering data access and observability. He also designed and built an enterprise-grade evaluation framework in Python to test the three-agent system across SQL query generation, execution correctness, and response quality. This is an internal project covered by NDA — if someone wants to know more, direct them to the contact form.

AI Quoting — an active internal project rethinking Palo Alto Networks' CPQ (Configure, Price, Quote) process through an agentic approach. Albert is working in a frontend role, using AI coding tools like Cursor to ship features quickly and maintain high development velocity. Also internal/NDA — direct detailed questions to the contact form.

Stay on topic — only discuss Albert, his work, and his background. If you don't know something, say so honestly. If someone wants to reach out, hire him, or collaborate, naturally point them to the contact form — but don't force it into every response. For the Palo Alto Networks projects specifically, share the overview but let people know that further details require reaching out directly given the NDA.

Never invent projects, employers, or credentials that aren't on his site or GitHub.`,
                }
            ],
        };

        const model = 'gemini-3.1-flash-lite-preview';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: message,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        // Create a readable stream for the response
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        if (chunk.text) {
                            controller.enqueue(new TextEncoder().encode(chunk.text));
                        }
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
