import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { type, theme } = await request.json();

    if (!type || !theme) {
      return NextResponse.json(
        { error: 'Type and theme are required' },
        { status: 400 }
      );
    }

    const prompt = generatePrompt(type, theme);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative game master for a romantic Truth & Dare game. Generate engaging, appropriate questions that bring people closer together. Keep questions fun, respectful, and suitable for friends or couples playing together."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    const question = completion.choices[0]?.message?.content?.trim();

    if (!question) {
      throw new Error('Failed to generate question');
    }

    return NextResponse.json({ question });
  } catch (error) {
    console.error('Error generating question:', error);
    
    // Fallback to predefined questions if API fails
    const fallbackQuestion = getFallbackQuestion(type, theme);
    return NextResponse.json({ question: fallbackQuestion });
  }
}

function generatePrompt(type: 'truth' | 'dare', theme: string): string {
  const basePrompts = {
    truth: {
      funny: "Generate a funny truth question that will make everyone laugh. Focus on embarrassing but harmless situations, silly preferences, or amusing hypothetical scenarios.",
      flirty: "Generate a flirty truth question that's playful and romantic. Focus on crushes, dating experiences, romantic preferences, or sweet relationship moments.",
      deep: "Generate a deep truth question that encourages meaningful conversation. Focus on personal values, life experiences, emotional insights, or philosophical thoughts about love and relationships.",
      naughty: "Generate a slightly naughty but tasteful truth question. Focus on romantic desires, attraction, or intimate (but not explicit) relationship topics."
    },
    dare: {
      funny: "Generate a funny dare that will entertain everyone. Focus on silly performances, harmless pranks, or amusing challenges that don't require props.",
      flirty: "Generate a flirty dare that's sweet and romantic. Focus on compliments, gentle physical gestures, or charming performances that bring people closer.",
      deep: "Generate a meaningful dare that encourages emotional connection. Focus on sharing feelings, expressing gratitude, or creating intimate moments through words or gestures.",
      naughty: "Generate a slightly naughty but tasteful dare. Focus on romantic gestures, playful physical challenges, or sensual (but appropriate) activities."
    }
  };

  const specificPrompt = basePrompts[type][theme as keyof typeof basePrompts.truth] || basePrompts[type].flirty;
  
  return `${specificPrompt} 

Requirements:
- Keep it appropriate for friends or couples
- Make it engaging and fun
- Ensure it can be completed in a social setting
- Keep the language playful and positive
- Return only the question/dare text, no extra formatting

Generate one ${type} question with a ${theme} theme:`;
}

function getFallbackQuestion(type: 'truth' | 'dare', theme: string): string {
  const fallbacks = {
    truth: {
      funny: "What's the most embarrassing thing you've done to get someone's attention?",
      flirty: "What's your ideal first date scenario?",
      deep: "What do you think love really means to you?",
      naughty: "What's the most romantic gesture you've ever wanted someone to do for you?"
    },
    dare: {
      funny: "Do your best impression of someone when they're falling in love",
      flirty: "Give someone in the room your most genuine compliment",
      deep: "Share a meaningful memory you have with someone in this room",
      naughty: "Describe your ideal romantic evening in detail"
    }
  };

  return fallbacks[type][theme as keyof typeof fallbacks.truth] || fallbacks[type].flirty;
}