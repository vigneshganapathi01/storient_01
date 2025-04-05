
-- Create purchase history table
CREATE TABLE IF NOT EXISTS public.purchase_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for purchase history
ALTER TABLE public.purchase_history ENABLE ROW LEVEL SECURITY;

-- Users can only see their own purchase history
CREATE POLICY "Users can view their own purchase history"
ON public.purchase_history
FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own purchase history
CREATE POLICY "Users can insert their own purchase history"
ON public.purchase_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);
