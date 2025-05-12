
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { createProject } from '@/services/projectService';
import { ProjectFormData } from '@/types';

interface ProjectCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: () => void;
}

export const ProjectCreationDialog = ({
  open,
  onOpenChange,
  onProjectCreated,
}: ProjectCreationDialogProps) => {
  const [newProject, setNewProject] = useState<ProjectFormData>({
    title: '',
    script: '',
    style: 'Minimalista',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
      await createProject(newProject);
      onOpenChange(false);
      setNewProject({
        title: '',
        script: '',
        style: 'Minimalista',
      });
      toast({
        title: 'Project Created',
        description: 'Your project has been created and will begin processing shortly.',
      });
      onProjectCreated();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateProject} disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner size="small" className="mr-2" /> : null}
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
