
import { supabase } from '@/lib/supabase';
import { Project, ProjectFormData, ProjectImage } from '@/types';
import { toast } from '@/hooks/use-toast';

// Fetch all projects for the current user
export const fetchProjects = async (): Promise<Project[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
};

// Fetch a specific project with its images
export const fetchProjectWithImages = async (projectId: string): Promise<{project: Project, images: ProjectImage[]}> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');
  
  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single();
  
  if (projectError) throw projectError;
  
  // Fetch images
  const { data: images, error: imagesError } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId)
    .order('scene_number', { ascending: true });
  
  if (imagesError) throw imagesError;
  
  return { 
    project: project as Project, 
    images: images as ProjectImage[] 
  };
};

// Create a new project
export const createProject = async (projectData: ProjectFormData): Promise<Project> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');
  
  // Create the project record
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert([
      { 
        ...projectData, 
        user_id: user.id, 
        status: 'Pendente'
      }
    ])
    .select()
    .single();
  
  if (projectError) throw projectError;
  
  // Trigger the n8n webhook
  try {
    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('N8N webhook URL not configured');
    }
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: project.id,
        roteiro: project.script,
        estilo: project.style,
        user_id: user.id
      }),
    });
    
    return project as Project;
  } catch (error) {
    // Log the error but don't fail the operation - the project was created
    console.error('Error triggering n8n webhook:', error);
    toast({
      title: "Project Created",
      description: "Your project was created but there was an issue starting the generation. Our team will investigate.",
      variant: "destructive",
    });
    return project as Project;
  }
};

// Subscribe to project updates
export const subscribeToProject = (
  projectId: string,
  callback: (project: Project) => void
) => {
  const subscription = supabase
    .channel(`project_${projectId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'projects',
        filter: `id=eq.${projectId}`,
      },
      (payload) => {
        callback(payload.new as Project);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};

// Subscribe to project images updates
export const subscribeToProjectImages = (
  projectId: string,
  callback: (image: ProjectImage) => void
) => {
  const subscription = supabase
    .channel(`project_images_${projectId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'project_images',
        filter: `project_id=eq.${projectId}`,
      },
      (payload) => {
        callback(payload.new as ProjectImage);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
