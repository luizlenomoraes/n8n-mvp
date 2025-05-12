
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Use the direct values from Supabase client.ts file which contains the correct URL and key
const SUPABASE_URL = "https://kiqqhyfksaerkvenwupw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpcXFoeWZrc2Flcmt2ZW53dXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzIwMTQsImV4cCI6MjA2MjY0ODAxNH0.hQ9-V9IF5CN31I3VlOldgbYuujsOccMk2U5-l2CQ7f4";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

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
