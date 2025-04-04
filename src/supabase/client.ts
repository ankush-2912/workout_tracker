
import { createClient } from '@supabase/supabase-js'
import { toast } from '@/components/ui/use-toast'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if the required environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.',
  )
  
  // Only show toast if we're in the browser context
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      toast({
        title: "Supabase Configuration Error",
        description: "Missing Supabase credentials. Please check your environment configuration.",
        variant: "destructive",
      })
    }, 1000)
  }
}

// Create and export the Supabase client with fallback values for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Export a helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey
}
