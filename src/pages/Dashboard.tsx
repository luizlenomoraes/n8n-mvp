
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { fetchProjects } from '@/services/projectService';
import { Project } from '@/types';
import { ProjectCreationDialog } from '@/components/dashboard/ProjectCreationDialog';
import { ProjectsList } from '@/components/dashboard/ProjectsList';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to load projects. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [toast]);

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <div className="flex space-x-4">
          <Button asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
          <Button onClick={() => setDialogOpen(true)}>New Project</Button>
        </div>
      </div>

      <ProjectsList 
        projects={projects} 
        loading={loading} 
        onCreateProject={() => setDialogOpen(true)} 
      />
      
      <ProjectCreationDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onProjectCreated={loadProjects}
      />
    </DashboardLayout>
  );
}
