
import { Button } from '@/components/ui/button';

interface EmptyProjectsStateProps {
  onCreateProject: () => void;
}

export const EmptyProjectsState = ({ onCreateProject }: EmptyProjectsStateProps) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
      <p className="text-muted-foreground mb-6">
        Create your first project to start generating images from your scripts.
      </p>
      <Button onClick={onCreateProject}>Create Your First Project</Button>
    </div>
  );
};
