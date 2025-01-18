// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bqeujxgpwuiyigjlmpsn.supabase.co'; // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZXVqeGdwd3VpeWlnamxtcHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzQ2MTgsImV4cCI6MjA0NzUxMDYxOH0.y5WRPP61rAkPk3zWcr7yqCQFVEUvZxzi-b5yL-REGUU'; // Replace with your Supabase Key

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
