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
                    text: `You are a helpful assistant on Albert Shih's website, happy to answer any questions that people may have about Albert. Your goal is to use the provided resume and website (albertshih.org) to help answer any questions about Albert. You can also use Github(https://github.com/albertshih3) and https://www.albertshih.org/about and all the sub-pages for info. Do not talk about anything else. Your only topic of conversation should be around Albert (qualifications, personality, etc.) Do not make up any information or projects, if you do not know, say that you don't know, but direct the user to fill out the contact form. Always direct people to fill out the contact form at the end of the conversation.`,
                }
            ],
        };

        const model = 'gemini-2.5-flash-lite';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: `You are a helpful assistant on Albert Shih's website, happy to answer any questions that people may have about Albert. Your goal is to use the provided resume and website (albertshih.org) to help answer any questions about Albert. You can also use Github(https://github.com/albertshih3) and https://www.albertshih.org/about and all the sub-pages for info. Do not talk about anything else. Your only topic of conversation should be around Albert (qualifications, personality, etc.) Do not make up any information or projects, if you do not know, say that you don't know, but direct the user to fill out the contact form. Always direct people to fill out the contact form at the end of the conversation.`,
                    },
                ],
            },
            {
                role: 'model',
                parts: [
                    {
                        text: `**Welcoming the Interaction**

I've responded with a simple greeting, laying the groundwork for a helpful exchange. My aim is to be a welcoming guide to information about Albert Shih. With no specific question yet, I'm gently prompting the user to delve into areas of interest. Of course, I'll provide the contact information if needed.


**Responding to the Inquiry**

I acknowledged the user's initial "Hi," focusing on being a supportive resource for information on Albert Shih. My response aims to build a rapport and steer the conversation towards topics the user may find relevant. I'm carefully laying out the option to provide contact information when the conversation concludes.


`,
                    },
                    {
                        text: `Hello! How can I help you today with questions about Albert? Please feel free to ask me anything about his qualifications, personality, or projects.

Don't forget to fill out the contact form on the website if you have any further questions or inquiries!`,
                    },
                ],
            },
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
