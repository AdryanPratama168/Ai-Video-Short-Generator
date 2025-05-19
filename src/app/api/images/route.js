import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Using the Stability AI API for image generation
// (Alternative: DALL-E through OpenAI)
export async function POST(request) {
  try {
    const { segments, style, aspectRatio } = await request.json();
    
    if (!segments || !Array.isArray(segments) || segments.length === 0) {
      return NextResponse.json(
        { error: 'Valid segments are required' },
        { status: 400 }
      );
    }

    // Parse aspect ratio for API
    const [width, height] = aspectRatio.split(':').map(Number);
    // Determine dimensions based on aspect ratio while keeping reasonable size
    let imgWidth = 1024;
    let imgHeight = 1024;
    
    if (width && height) {
      if (width > height) {
        // Landscape
        imgWidth = 1024;
        imgHeight = Math.round(1024 * (height / width));
      } else {
        // Portrait
        imgHeight = 1024;
        imgWidth = Math.round(1024 * (width / height));
      }
    }
    
    // Make dimensions divisible by 64 (Stability AI requirement)
    imgWidth = Math.floor(imgWidth / 64) * 64;
    imgHeight = Math.floor(imgHeight / 64) * 64;

    const images = [];
    
    // Process each segment and generate an image
    for (const segment of segments) {
      const imagePrompt = segment.imagePrompt || segment.text;
      
      // Add style modifiers to the prompt
      let enhancedPrompt = `${imagePrompt}`;
      if (style === 'realistic') {
        enhancedPrompt += ", photorealistic, detailed, high quality";
      } else if (style === 'cartoon') {
        enhancedPrompt += ", cartoon style, colorful, stylized";
      } else if (style === 'anime') {
        enhancedPrompt += ", anime style, japanese animation";
      } else if (style === 'watercolor') {
        enhancedPrompt += ", watercolor painting, artistic, soft colors";
      } else if (style === 'oil-painting') {
        enhancedPrompt += ", oil painting, textured, classical art style";
      }

      // Call Stability AI API
            const response = await axios({
        method: 'post',
        url: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`
        },
        data: {
          text_prompts: [
            {
              text: enhancedPrompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: imgHeight,
          width: imgWidth,
          samples: 1,
          steps: 30,
        }
      });

      // Tambahkan ini untuk menyimpan hasil
      images.push(response.data);
    }

    // Setelah selesai proses semua, kirim balik hasil
    return NextResponse.json({ images });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }
}
