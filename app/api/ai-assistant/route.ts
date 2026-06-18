import { NextResponse } from 'next/server';
import { generateAssistantResponse } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message required' },
        { status: 400 }
      );
    }

    const response = await generateAssistantResponse(message);

    return NextResponse.json({
      success: true,
      data: {
        response,
      },
    });
  } catch (error) {
    console.error('Error generating assistant response:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
