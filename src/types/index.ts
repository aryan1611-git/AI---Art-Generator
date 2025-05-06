export interface GenerationParams {
  prompt: string;
  style: ArtStyle;
  size: ImageSize;
  negativePrompt?: string;
  seed?: number;
}

export type ArtStyle = 
  | 'photorealistic'
  | 'digital-art'
  | 'abstract'
  | 'watercolor'
  | 'oil-painting'
  | 'sketch'
  | 'pixel-art'
  | 'vaporwave';

export type ImageSize = '512x512' | '768x768' | '1024x1024';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ArtStyle;
  createdAt: Date;
  size: ImageSize;
}