import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { fetchProjects, createProject } from '@/services/projectService';
import { Project } from '@/types';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    title: '',
    script: '',
    style: 'Minimalista' as 'Minimalista' | 'Quadrinhos',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
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

    loadProjects();
  }, [toast]);

  const handleCreateProject = async () => {
    if (!newProject.title.trim() || !newProject.script.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Submitting project:', newProject);
      const createdProject = await createProject(newProject);
      setProjects((prev) => [createdProject, ...prev]);
      setDialogOpen(false);
      setNewProject({
        title: '',
        script: '',
        style: 'Minimalista',
      });
      toast({
        title: 'Project Created',
        description: 'Your project has been created and will begin processing shortly.',
      });
    } catch (error: any) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create project. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-500';
      case 'Em Progresso':
        return 'bg-blue-500';
      case 'Concluído':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>New Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Fill out the details below to create a new project. Each paragraph of your script will be transformed into an image.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Enter project title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="script">Script / Roteiro</Label>
                <Textarea
                  id="script"
                  value={newProject.script}
                  onChange={(e) => setNewProject({ ...newProject, script: e.target.value })}
                  placeholder="Enter your script here. Each paragraph will be transformed into an image."
                  className="min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select
                  value={newProject.style}
                  onValueChange={(value: 'Minimalista' | 'Quadrinhos') => setNewProject({ ...newProject, style: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minimalista">Minimalista</SelectItem>
                    <SelectItem value="Quadrinhos">Quadrinhos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner size="small" className="mr-2" /> : null}
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="truncate">{project.title}</CardTitle>
                    <div className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {new Date(project.created_at).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-gray-600">
                    {project.script}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm">
                    Style: <span className="font-medium">{project.style}</span>
                  </p>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first project to start generating images from your scripts.
          </p>
          <Button onClick={() => setDialogOpen(true)}>Create Your First Project</Button>
        </div>
      )}
    </DashboardLayout>
  );
}
