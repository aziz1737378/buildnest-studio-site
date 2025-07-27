-- Enable realtime for contact_messages table
ALTER TABLE contact_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE contact_messages;