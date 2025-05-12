
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Custom function to provision Google Drive folder
export const provisionDriveFolder = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');
  
  // Call the Supabase Edge Function to create a Google Drive folder
  const { data, error } = await supabase.functions.invoke('provision-drive-folder', {
    body: { userId: user.id },
  });
  
  if (error) throw error;
  return data;
};

// Function to get user's Drive folder ID
export const getUserDriveFolder = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');
  
  const { data, error } = await supabase
    .from('profiles')
    .select('drive_folder_id')
    .eq('id', user.id)
    .single();
  
  if (error) throw error;
  return data?.drive_folder_id;
};
