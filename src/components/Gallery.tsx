import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { Clock, Calendar, Grid, ListFilter } from 'lucide-react';

interface GalleryProps {
  images: GeneratedImage[];
  onSelectImage: (image: GeneratedImage) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onSelectImage }) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('all');
  
  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.style === filter);
  
  const getUniqueStyles = () => {
    const styles = new Set(images.map(img => img.style));
    return Array.from(styles);
  };

  if (images.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
        <div className="mb-4">
          <Clock className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">No Images Yet</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Your generated images will appear here. Start creating!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          Your Gallery
        </h2>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 pl-9 pr-8 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Styles</option>
              {getUniqueStyles().map(style => (
                <option key={style} value={style}>
                  {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
            <ListFilter className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-md ${layout === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
              aria-label="Grid layout"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-md ${layout === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
              aria-label="List layout"
            >
              <div className="flex flex-col gap-0.5">
                <div className="h-0.5 w-4 bg-current rounded-full"></div>
                <div className="h-0.5 w-4 bg-current rounded-full"></div>
                <div className="h-0.5 w-4 bg-current rounded-full"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`p-4 ${layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-4'}`}>
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            onClick={() => onSelectImage(image)}
            className={`cursor-pointer group overflow-hidden rounded-lg transition-all hover:shadow-md ${
              layout === 'grid' 
                ? 'border border-gray-200 dark:border-gray-800' 
                : 'flex items-center gap-4 p-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <div 
              className={`bg-gray-100 dark:bg-gray-800 relative ${
                layout === 'grid' ? 'pt-[100%]' : 'w-16 h-16 flex-shrink-0'
              }`}
            >
              <img 
                src={image.url} 
                alt={image.prompt}
                className={`${layout === 'grid' ? 'absolute inset-0' : ''} w-full h-full object-cover group-hover:scale-105 transition-transform`}
              />
            </div>
            
            {layout === 'grid' ? (
              <div className="p-3">
                <p className="text-sm text-gray-800 dark:text-white line-clamp-2 font-medium">
                  {image.prompt}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                    {image.style.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-white line-clamp-1 font-medium">
                  {image.prompt}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                    {image.style.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {image.size}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;