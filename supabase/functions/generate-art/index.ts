import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key presence
    const stabilityApiKey = Deno.env.get("STABILITY_API_KEY");
    if (!stabilityApiKey) {
      throw new Error("Stability AI API key not found. Please add it as an environment variable in your Supabase Edge Functions settings.");
    }

    const { prompt, style, size, negativePrompt } = await req.json();

    // Basic input validation
    if (!prompt || !style || !size) {
      throw new Error("Missing required parameters: prompt, style, and size are required");
    }

    // Initialize Stability AI client
    const stability = {
      baseUrl: "https://api.stability.ai/v1",
      apiKey: stabilityApiKey,
    };

    // Test API key validity
    const accountResponse = await fetch(`${stability.baseUrl}/user/account`, {
      headers: {
        Authorization: `Bearer ${stability.apiKey}`,
      },
    });

    if (!accountResponse.ok) {
      if (accountResponse.status === 401) {
        throw new Error("Invalid Stability AI API key. Please check your API key in Supabase Edge Functions settings.");
      }
      throw new Error(`Failed to validate Stability AI API key: ${accountResponse.statusText}`);
    }

    // Convert our size format to Stability AI format
    const [width, height] = size.split("x").map(Number);

    // Prepare the generation request
    const response = await fetch(`${stability.baseUrl}/generation/stable-diffusion-xl-1024-v1-0/text-to-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stability.apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `${prompt} in style: ${style.replace("-", " ")}`,
            weight: 1,
          },
          ...(negativePrompt
            ? [
                {
                  text: negativePrompt,
                  weight: -1,
                },
              ]
            : []),
        ],
        cfg_scale: 7,
        height,
        width,
        steps: 30,
        samples: 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Stability AI API error: ${response.statusText}. ${errorData.message || "Please verify your API key and ensure you have sufficient credits."}`);
    }

    const result = await response.json();

    // Get the generated image base64 data
    const imageData = result.artifacts[0].base64;

    // Store the result in Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase configuration is missing. Please check your Edge Function environment variables.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: uploadData, error: uploadError } = await supabase.storage.from("ai-art").upload(
      `${Date.now()}-${Math.random().toString(36).substring(7)}.png`,
      Uint8Array.from(atob(imageData), (c) => c.charCodeAt(0)),
      {
        contentType: "image/png",
        cacheControl: "3600",
      }
    );

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get the public URL for the uploaded image
    const {
      data: { publicUrl },
    } = supabase.storage.from("ai-art").getPublicUrl(uploadData.path);

    // Store the generation metadata
    const { data: imageRecord, error: dbError } = await supabase
      .from("generated_images")
      .insert([
        {
          prompt,
          style,
          size,
          url: publicUrl,
          negative_prompt: negativePrompt,
        },
      ])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    return new Response(JSON.stringify(imageRecord), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Edge function error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred while generating the image.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
