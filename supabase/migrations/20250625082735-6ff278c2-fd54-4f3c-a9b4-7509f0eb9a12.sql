
-- Create users profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  username TEXT UNIQUE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  eco_points INTEGER DEFAULT 0,
  total_scans INTEGER DEFAULT 0,
  items_recycled INTEGER DEFAULT 0,
  co2_saved DECIMAL(10,2) DEFAULT 0.00,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create plastic types table for ML model training data
CREATE TABLE public.plastic_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plastic_code TEXT NOT NULL UNIQUE, -- PET, HDPE, PVC, LDPE, PP, PS, OTHER
  name TEXT NOT NULL,
  description TEXT,
  recyclable BOOLEAN DEFAULT true,
  recycling_instructions TEXT,
  environmental_impact TEXT,
  common_uses TEXT[],
  recycling_difficulty TEXT, -- easy, medium, hard
  co2_impact_per_kg DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scan history table
CREATE TABLE public.scan_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  image_url TEXT NOT NULL,
  detected_items JSONB, -- Store AI detection results
  plastic_type_id UUID REFERENCES plastic_types(id),
  confidence_score DECIMAL(5,2),
  recyclable BOOLEAN,
  disposal_method TEXT,
  eco_points_earned INTEGER DEFAULT 0,
  location_scanned TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community submissions table
CREATE TABLE public.community_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  image_url TEXT NOT NULL,
  item_name TEXT NOT NULL,
  user_classification TEXT,
  plastic_type_suggested TEXT,
  description TEXT,
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES auth.users,
  votes_helpful INTEGER DEFAULT 0,
  votes_not_helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recycling centers table
CREATE TABLE public.recycling_centers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  phone TEXT,
  website TEXT,
  accepted_materials TEXT[],
  hours_of_operation TEXT,
  special_instructions TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat conversations table for AI assistant
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create educational content table
CREATE TABLE public.educational_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT, -- best_practices, success_stories, innovations
  image_url TEXT,
  author_id UUID REFERENCES auth.users,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT, -- achievement, reminder, community, system
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial plastic types data for ML training
INSERT INTO public.plastic_types (plastic_code, name, description, recyclable, recycling_instructions, environmental_impact, common_uses, recycling_difficulty, co2_impact_per_kg) VALUES
('PET', 'Polyethylene Terephthalate', 'Clear, lightweight plastic commonly used for beverages', true, 'Rinse clean, remove caps and labels. Most recycling programs accept PET bottles.', 'Highly recyclable, can be turned into new bottles, clothing, and carpets', ARRAY['Water bottles', 'Soda bottles', 'Food containers'], 'easy', 2.3),
('HDPE', 'High-Density Polyethylene', 'Durable plastic used for milk jugs and detergent bottles', true, 'Rinse thoroughly, keep caps on. Widely accepted in curbside recycling.', 'Very recyclable, minimal environmental impact when recycled properly', ARRAY['Milk jugs', 'Detergent bottles', 'Shampoo bottles'], 'easy', 1.8),
('PVC', 'Polyvinyl Chloride', 'Rigid plastic used for pipes and packaging', false, 'Generally not recyclable in curbside programs. Check for special collection sites.', 'Contains harmful chemicals, difficult to recycle safely', ARRAY['Pipes', 'Wire insulation', 'Some packaging'], 'hard', 4.2),
('LDPE', 'Low-Density Polyethylene', 'Flexible plastic used for bags and films', true, 'Take to special collection bins at grocery stores. Not accepted in curbside recycling.', 'Recyclable but requires special facilities', ARRAY['Plastic bags', 'Food wraps', 'Squeezable bottles'], 'medium', 2.1),
('PP', 'Polypropylene', 'Versatile plastic used for containers and caps', true, 'Clean thoroughly, increasingly accepted in recycling programs', 'Good recyclability, growing acceptance in programs', ARRAY['Yogurt containers', 'Bottle caps', 'Straws'], 'medium', 1.9),
('PS', 'Polystyrene', 'Lightweight foam plastic for packaging', false, 'Rarely recyclable in standard programs. Look for special collection events.', 'Very difficult to recycle, breaks into microplastics easily', ARRAY['Foam containers', 'Disposable cups', 'Packaging peanuts'], 'hard', 3.8),
('OTHER', 'Other Plastics', 'Mixed or composite plastics', false, 'Generally not recyclable. Consider reuse or proper disposal.', 'Complex composition makes recycling nearly impossible', ARRAY['Multi-layer packaging', 'CDs', 'Some toys'], 'hard', 5.2);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for scan history
CREATE POLICY "Users can view their own scan history" ON public.scan_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own scans" ON public.scan_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for community submissions
CREATE POLICY "Users can view all community submissions" ON public.community_submissions FOR SELECT TO authenticated;
CREATE POLICY "Users can insert their own submissions" ON public.community_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own submissions" ON public.community_submissions FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for chat conversations
CREATE POLICY "Users can view their own conversations" ON public.chat_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own conversations" ON public.chat_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for chat messages
CREATE POLICY "Users can view messages from their conversations" ON public.chat_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id AND user_id = auth.uid()
  )
);
CREATE POLICY "Users can insert messages to their conversations" ON public.chat_messages FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.chat_conversations 
    WHERE id = conversation_id AND user_id = auth.uid()
  )
);

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Allow public read access to plastic types, recycling centers, and educational content
CREATE POLICY "Anyone can view plastic types" ON public.plastic_types FOR SELECT TO authenticated;
CREATE POLICY "Anyone can view recycling centers" ON public.recycling_centers FOR SELECT TO authenticated;
CREATE POLICY "Anyone can view published educational content" ON public.educational_content FOR SELECT TO authenticated;

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update eco points and stats
CREATE OR REPLACE FUNCTION public.update_user_stats(
  p_user_id UUID,
  p_eco_points INTEGER,
  p_co2_saved DECIMAL(10,2)
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    eco_points = eco_points + p_eco_points,
    total_scans = total_scans + 1,
    items_recycled = items_recycled + 1,
    co2_saved = co2_saved + p_co2_saved,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
