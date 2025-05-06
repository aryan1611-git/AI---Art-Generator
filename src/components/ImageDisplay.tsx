import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { Download, Share2, ThumbsUp, XCircle } from 'lucide-react';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  onClose: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  if (!image) return null;
  
  const handleDownload = () => {
    // In a real app, this would download the actual image
    window.open(image.url, '_blank');
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(image.url);
    alert('Image URL copied to clipboard!');
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="relative">
        <div className={`relative pt-[100%] bg-gray-100 dark:bg-gray-800 overflow-hidden ${!isImageLoaded ? 'animate-pulse' : ''}`}>
          <img
            src={image.url}
            alt={image.prompt}
            onLoad={() => setIsImageLoaded(true)}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm transition-colors"
          aria-label="Close"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
          {image.prompt}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded-full">
            {image.style.replace('-', ' ')}
          </span>
          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full">
            {image.size}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(image.createdAt).toLocaleString()}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Download image"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Share image"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              aria-label="Like image"
            >
              <ThumbsUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;