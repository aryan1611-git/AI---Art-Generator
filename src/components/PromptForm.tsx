import React, { useState } from "react";
import { ArtStyle, GenerationParams, ImageSize } from "../types";
import { styleDescriptions } from "../utils/mockData";
import { Wand2, RefreshCcw } from "lucide-react";

interface PromptFormProps {
  onGenerate: (params: GenerationParams) => void;
  isGenerating: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<ArtStyle>("digital-art");
  const [size, setSize] = useState<ImageSize>("1024x1024");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    onGenerate({
      prompt,
      style,
      size,
      negativePrompt: negativePrompt.trim() || undefined,
    });
  };

  const handleRandomPrompt = () => {
    const prompts = ["A surreal landscape with floating islands and rainbow waterfalls", "A cyberpunk cityscape at night with neon lights and flying cars", "A magical forest with glowing plants and mythical creatures", "An astronaut standing on an alien planet with two moons", "A futuristic robot with organic features in a Japanese garden", "A steampunk airship flying through clouds at sunset", "A beautiful underwater city with mermaids and coral architecture", "A dragon sleeping on a mountain of gold coins in a cave"];
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  return (
    <div className="w-full p-5 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create Your Art</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Describe your image
          </label>
          <div className="relative">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A surreal landscape with floating islands and rainbow waterfalls..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 min-h-[100px] pr-10"
              required
            />
            <button
              type="button"
              onClick={handleRandomPrompt}
              className="absolute right-3 top-3 text-gray-400 hover:text-purple-500 dark:text-gray-500 dark:hover:text-purple-400 transition-colors"
              aria-label="Random prompt"
            >
              <RefreshCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="style"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Art Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value as ArtStyle)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {Object.entries(styleDescriptions).map(([styleKey]) => (
              <option
                key={styleKey}
                value={styleKey}
              >
                {styleKey.charAt(0).toUpperCase() + styleKey.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{styleDescriptions[style]}</p>
        </div>

        <div>
          <label
            htmlFor="size"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Image Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSize("1024x1024")}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${size === "1024x1024" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-2 border-purple-500" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700"}`}
            >
              1024×1024
            </button>
            <button
              type="button"
              onClick={() => setSize("1152x896")}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${size === "1152x896" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-2 border-purple-500" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700"}`}
            >
              1152×896
            </button>
            <button
              type="button"
              onClick={() => setSize("896x1152")}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${size === "896x1152" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-2 border-purple-500" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700"}`}
            >
              896×1152
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
          >
            {showAdvanced ? "Hide" : "Show"} Advanced Options
          </button>

          {showAdvanced && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
              <label
                htmlFor="negativePrompt"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
              >
                Negative Prompt (things to avoid)
              </label>
              <textarea
                id="negativePrompt"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Low quality, distorted faces, blurry, unrealistic..."
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 min-h-[70px]"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className={`w-full py-3 px-4 flex items-center justify-center gap-2 rounded-lg font-medium text-white transition-all duration-200 ${isGenerating || !prompt.trim() ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 shadow-md hover:shadow-lg"}`}
        >
          {isGenerating ? (
            <>
              <RefreshCcw className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              Generate Image
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic mt-2">Not sure what to create? Try the random prompt button or explore the gallery for inspiration!</p>
      </form>
    </div>
  );
};

export default PromptForm;
