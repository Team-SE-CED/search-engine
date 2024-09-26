import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
export const supabase = createClient(
  "https://gfbbjwyqfnqpqhkwieyd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmYmJqd3lxZm5xcHFoa3dpZXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5NjM2OTMsImV4cCI6MjA0MjUzOTY5M30.5BACw-QIgGSV8HyfcKImuQoIrlAu9ez7w3J0Txf9s-8"
);
