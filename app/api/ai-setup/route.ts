ok import { NextResponse } from 'next/server';
import { generateAiSetup, generateAssistantResponse } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { budget, useCase, experienceLevel, climate, spaceSize } = body;

    if (!budget || !useCase || !experienceLevel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const setup = await generateAiSetup({
      budget,
      useCase,
      experienceLevel,
      climate,
      spaceSize,
    });

    return NextResponse.json({
      success: true,
      data: setup,
    });
  } catch (error) {
    console.error('Error generating AI setup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate setup' },
      { status: 500 }
    );
  }
}
