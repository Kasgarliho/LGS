import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // CORS preflight isteğini yönet
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id, new_password } = await req.json();

    if (!user_id || !new_password) {
      throw new Error("Kullanıcı ID ve yeni şifre zorunludur.");
    }
    if (new_password.length < 6) {
      throw new Error("Yeni şifre en az 6 karakter olmalıdır.");
    }

    // Admin yetkilerine sahip bir Supabase client oluştur
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Kullanıcı şifresini güncelle
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user_id,
      { password: new_password }
    );

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ message: "Şifre başarıyla güncellendi!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});