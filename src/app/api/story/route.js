import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { idea } = await request.json();
    
    if (!idea || idea.trim() === '') {
      return NextResponse.json(
        { error: 'Idea is required' },
        { status: 400 }
      );
    }

    // Generate the story with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative storyteller. Create an engaging short story based on the user's idea. The story should be 300-500 words, have a clear beginning, middle, and end. Make it suitable for a short video."
        },
        {
          role: "user",
          content: `Create a short story based on this idea: ${idea}`
        }
      ],
      temperature: 0.7,
    });

    const story = completion.choices[0].message.content;

    // Now segment the story into scenes (approximately 3-6 scenes)
    const segmentCompletion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "Divide the story into logical segments or scenes (3-6 segments). For each segment, provide the text and a short description for image generation. Return JSON format like: { segments: [{ text: 'segment text', imagePrompt: 'description for image generation' }] }"
        },
        {
          role: "user",
          content: `Divide this story into logical segments:\n\n${story}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    // Parse the segments from the response
    const segmentsData = JSON.parse(segmentCompletion.choices[0].message.content);

    return NextResponse.json({
      story,
      segments: segmentsData.segments,
    });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
}