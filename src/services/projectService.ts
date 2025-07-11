
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
  
  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
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
  console.log('Creating project with data:', projectData);
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('User not authenticated');
  
  try {
    // Create the project record with correct field mapping
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: projectData.title, 
        script: projectData.script, // Usar script diretamente
        roteiro: projectData.script, // Mapeando script para roteiro também
        style: projectData.style, 
        user_id: user.id, 
        status: 'Pendente'
      })
      .select()
      .single();
    
    if (projectError) {
      console.error('Error creating project:', projectError);
      throw projectError;
    }

    console.log('Project created successfully:', project);
    
    // Trigger the webhook
    try {
      await fetch('https://webhook.modelaai.online/webhook/mvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: project.id,
          roteiro: project.script, // Usando project.script em vez de project.roteiro
          estilo: project.style,
          user_id: user.id
        }),
      });
      console.log('Webhook triggered successfully');
    } catch (webhookError) {
      console.error('Error triggering webhook:', webhookError);
      // Não vamos falhar a operação se o webhook falhar
    }
    
    return project as Project;
  } catch (error) {
    console.error('Error in createProject:', error);
    throw error;
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
