import { GeneratedImage } from '../types';

// Sample placeholder images from Pexels
const placeholderImages = [
  'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2832432/pexels-photo-2832432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

export const mockGeneratedImages: GeneratedImage[] = [
  {
    id: '1',
    url: placeholderImages[0],
    prompt: 'A surreal landscape with floating islands and waterfalls',
    style: 'digital-art',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    size: '1024x1024'
  },
  {
    id: '2',
    url: placeholderImages[1],
    prompt: 'Abstract patterns with vibrant colors and geometric shapes',
    style: 'abstract',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    size: '768x768'
  },
  {
    id: '3',
    url: placeholderImages[2],
    prompt: 'Futuristic cityscape with neon lights and flying vehicles',
    style: 'digital-art',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    size: '1024x1024'
  },
  {
    id: '4',
    url: placeholderImages[3],
    prompt: 'A serene mountain lake at sunset with reflections',
    style: 'photorealistic',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    size: '512x512'
  },
  {
    id: '5',
    url: placeholderImages[4],
    prompt: 'Cyberpunk character with glowing accessories in a dark alley',
    style: 'vaporwave',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    size: '768x768'
  }
];

export const styleDescriptions = {
  'photorealistic': 'Ultra-detailed images that appear like photographs',
  'digital-art': 'Clean, polished digital artwork with vivid colors',
  'abstract': 'Non-representational art using shapes, colors, and forms',
  'watercolor': 'Soft, translucent appearance with gentle color blending',
  'oil-painting': 'Rich textures and depth similar to traditional oil painting',
  'sketch': 'Hand-drawn appearance with line work and shading',
  'pixel-art': 'Retro-styled imagery with visible pixel structure',
  'vaporwave': 'Nostalgic 80s/90s aesthetic with neon colors and glitch effects'
};