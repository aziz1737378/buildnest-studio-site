-- Drop the existing INSERT policy and recreate it to ensure it works properly
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contact_messages;

-- Create a new INSERT policy that explicitly allows anyone to insert
CREATE POLICY "Allow all inserts for contact messages" 
ON public.contact_messages 
FOR INSERT 
TO public 
WITH CHECK (true);