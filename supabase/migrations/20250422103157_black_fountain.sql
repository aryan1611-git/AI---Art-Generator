/*
  # Create storage bucket for AI generated images

  1. New Storage Bucket
    - Name: ai-art
    - Public access enabled
    - File size limit: 10MB
    - Allowed mime types: image/png
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ai-art',
  'ai-art',
  true,
  10485760,
  ARRAY['image/png']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Enable public access to the bucket
CREATE POLICY "Public Access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ai-art');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'ai-art' 
  AND owner = auth.uid()
);