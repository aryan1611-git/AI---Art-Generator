/*
  # Create generated images table

  1. New Tables
    - `generated_images`
      - `id` (uuid, primary key)
      - `prompt` (text)
      - `style` (text)
      - `size` (text)
      - `url` (text)
      - `negative_prompt` (text, nullable)
      - `created_at` (timestamp with time zone)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `generated_images` table
    - Add policies for authenticated users to:
      - Read their own generated images
      - Insert new generated images
*/

CREATE TABLE IF NOT EXISTS generated_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt text NOT NULL,
  style text NOT NULL,
  size text NOT NULL,
  url text NOT NULL,
  negative_prompt text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own generated images"
  ON generated_images
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generated images"
  ON generated_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);