import { useState, useEffect } from "react";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import ImageDisplay from "./components/ImageDisplay";
import Gallery from "./components/Gallery";
import LoadingIndicator from "./components/LoadingIndicator";
import { GeneratedImage, GenerationParams } from "./types";
import { generateImage, fetchGeneratedImages } from "./services/api";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }

    const loadImages = async () => {
      try {
        const fetchedImages = await fetchGeneratedImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Failed to load images:", error);
        setError("Failed to load your gallery. Please try refreshing the page.");
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleGenerate = async (params: GenerationParams) => {
    setIsGenerating(true);
    setCurrentImage(null);
    setError(null);

    try {
      const newImage = await generateImage(params);
      setCurrentImage(newImage);
      setImages([newImage, ...images]);
    } catch (error) {
      console.error("Failed to generate image:", error);
      setError(error instanceof Error ? error.message : "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseImage = () => {
    setCurrentImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header toggleTheme={toggleTheme} />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-purple-600 via-teal-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">AI Art Generator</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Transform your ideas into stunning artwork using the power of AI. Just describe what you want to see, choose a style, and watch the magic happen.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-6">
              <PromptForm
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              {error && <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">{error}</div>}

              <div className="md:hidden">
                {isGenerating ? (
                  <LoadingIndicator />
                ) : currentImage ? (
                  <ImageDisplay
                    image={currentImage}
                    onClose={handleCloseImage}
                  />
                ) : null}
              </div>

              <div className="block md:hidden">
                <Gallery
                  images={images}
                  onSelectImage={setCurrentImage}
                />
              </div>
            </div>

            <div className="space-y-6 hidden md:block">
              {isGenerating ? (
                <LoadingIndicator />
              ) : currentImage ? (
                <ImageDisplay
                  image={currentImage}
                  onClose={handleCloseImage}
                />
              ) : (
                <div className="h-full min-h-[400px] flex items-center justify-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
                  <div className="text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-purple-600 dark:text-purple-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Create Something Amazing</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Fill out the form with your creative idea and generate unique AI artwork in seconds!</p>
                  </div>
                </div>
              )}

              <Gallery
                images={images}
                onSelectImage={setCurrentImage}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ArtifyAI • AI Image Generation</p>
          <p className="mt-2">This is a demo application.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
