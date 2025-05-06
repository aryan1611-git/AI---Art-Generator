import { createClient } from '@supabase/supabase-js';
import { GeneratedImage, GenerationParams } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const generateImage = async (params: GenerationParams): Promise<GeneratedImage> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-art`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || 'Failed to generate image. Please try again.';
      
      // Check for specific error conditions
      if (errorMessage.includes('API key')) {
        throw new Error('The AI service is currently unavailable. Please try again in a few minutes.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      }
      if (response.status === 503) {
        throw new Error('The AI service is temporarily unavailable. Please try again later.');
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.url) {
      throw new Error('The image generation was incomplete. Please try again.');
    }
    
    return {
      id: data.id,
      url: data.url,
      prompt: data.prompt,
      style: data.style,
      createdAt: new Date(data.created_at),
      size: data.size
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

export const fetchGeneratedImages = async (): Promise<GeneratedImage[]> => {
  const { data, error } = await supabase
    .from('generated_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map(img => ({
    id: img.id,
    url: img.url,
    prompt: img.prompt,
    style: img.style,
    createdAt: new Date(img.created_at),
    size: img.size
  }));
};