import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { updateCount } from '@/services/usage';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { relation, name, reason, manner, maxLength } = await req.json();

    const basePrompts = process.env.BASE_PROMPT!.split('\\n');

    const prompt = `${basePrompts[0]}
  1. ${basePrompts[1]} ${relation}.${name && ` ${name} ${process.env.NAME_PROMPT!}`}
  2. ${basePrompts[2]} ${reason}.
  3. ${basePrompts[3]} ${manner}.
  4. ${basePrompts[4]} ${maxLength}.
  5. ${basePrompts[5]}
  6. ${basePrompts[6]}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: process.env.SYSTEM_PROMPT! },
        { role: 'user', content: prompt },
      ],
      stream: true,
      max_tokens: 1024,
      temperature: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    await updateCount();

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response('Too many requests', { status: 429 });
  }
}
