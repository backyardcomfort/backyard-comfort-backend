import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;

export async function generateAiSetup({
  budget,
  useCase,
  experienceLevel,
  climate,
  spaceSize,
}: {
  budget: number;
  useCase: string;
  experienceLevel: string;
  climate?: string;
  spaceSize?: string;
}) {
  const prompt = `
You are the Backyard Comfort AI Assistant, a gear consultant helping outdoor enthusiasts.

Based on the following inputs, generate a comprehensive setup recommendation:
- Budget: $${budget}
- Use Case: ${useCase}
- Experience Level: ${experienceLevel}
- Climate: ${climate || 'Not specified'}
- Space Size: ${spaceSize || 'Not specified'}

Provide a JSON response with:
1. Essential products (must-haves)
2. Comfort upgrades (nice-to-haves)
3. Premium upgrades (luxury items)
4. Budget alternatives
5. Recommended starter kit
6. Estimated total cost

Format as JSON with keys: essentials, upgrades, premiumUpgrades, budgetAlternatives, starterKit, totalEstimate
`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content || '{}');
}

export async function generateAssistantResponse(userMessage: string) {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: `You are the Backyard Comfort Assistant, a knowledgeable gear consultant for outdoor enthusiasts. Provide helpful, product-focused recommendations. Ask clarifying questions when needed. Be conversational but structured.`,
      },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
