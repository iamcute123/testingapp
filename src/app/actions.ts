'use server';

export interface AiAnalyzerState {
  result: string | null;
  error: string | null;
}

export async function runAnalysis(
  prevState: AiAnalyzerState,
  formData: FormData
): Promise<AiAnalyzerState> {
  const security = formData.get('security');

  if (!security) {
    return { result: null, error: 'Please select a security to analyze.' };
  }

  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real app, you would call your Genkit AI flow here.
  // const response = await run('yourAiFlow', { security });

  // Mock response
  const mockInsights = [
    `Anomaly Detected for ${security}: Unusual trading volume observed over the last 5 trading sessions, suggesting potential institutional interest.`,
    `Pattern Insight for ${security}: A bullish flag pattern is forming on the daily chart, indicating a potential upward breakout.`,
    `Alpha Driver for ${security}: Recent positive earnings surprise combined with increased sector momentum could be a significant alpha driver.`,
  ];

  const result = mockInsights[Math.floor(Math.random() * mockInsights.length)];
  
  return { result, error: null };
}
