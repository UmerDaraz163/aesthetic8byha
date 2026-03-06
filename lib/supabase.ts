import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL and Anon Key are required. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
    throw new Error('Supabase configuration missing. Please check your environment variables.');
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
};

// Define a proper type for the supabase wrapper using Parameters utility type
interface SupabaseWrapper {
  from: (table: string) => ReturnType<SupabaseClient['from']>;
  auth: {
    getSession: () => ReturnType<SupabaseClient['auth']['getSession']>;
    signInWithPassword: (credentials: SignInWithPasswordCredentials) => ReturnType<SupabaseClient['auth']['signInWithPassword']>;
    signUp: (...args: Parameters<SupabaseClient['auth']['signUp']>) => ReturnType<SupabaseClient['auth']['signUp']>;
    signOut: () => ReturnType<SupabaseClient['auth']['signOut']>;
  };
}

// For backward compatibility with existing imports if any
export const supabase: SupabaseWrapper = {
  from: (table: string) => getSupabase().from(table),
  auth: {
    getSession: () => getSupabase().auth.getSession(),
    signInWithPassword: (credentials: SignInWithPasswordCredentials) => 
      getSupabase().auth.signInWithPassword(credentials),
    signUp: (...args) => 
      getSupabase().auth.signUp(...args),
    signOut: () => getSupabase().auth.signOut(),
  }
};