import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://feddaiubesbjylbdfqkr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZGRhaXViZXNianlsYmRmcWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjUyOTcsImV4cCI6MjA1OTYwMTI5N30.nQtcSefxpKQnZV9vTYZmp2KqTUjdmsWOCP2PSYy22rw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Keep the default export for backward compatibility
export default supabase