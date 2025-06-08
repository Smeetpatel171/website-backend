import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  'https://nexrfifcymcgnuwslimw.supabase.co',        // Project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leHJmaWZjeW1jZ251d3NsaW13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTMxMzEsImV4cCI6MjA2NDk4OTEzMX0.zozXrk8D_EODOvQPYsOoDDgbmUnvK2EJOyV237u1LzM'                        // Public anon key
);

export default supabase;
