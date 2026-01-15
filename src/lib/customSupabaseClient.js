import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pcsjsrlbpitgueorgozj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjc2pzcmxicGl0Z3Vlb3Jnb3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MTIzMTMsImV4cCI6MjA2OTk4ODMxM30.LFWaxNdl7NXCpZPXECR-dNkkUsp0ZV_3CMgR7uYzCKE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);