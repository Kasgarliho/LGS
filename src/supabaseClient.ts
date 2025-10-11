import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY  // ✅ DÜZELTİLDİ

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL veya ANON KEY bulunamıyor. Lütfen .env dosyanızı kontrol edin.')
}

// Debug log (burada göster)
console.log('✅ Supabase URL:', supabaseUrl)
console.log('✅ Supabase ANON KEY:', supabaseAnonKey?.slice(0, 10) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
