
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { EmptyProjectsState } from './EmptyProjectsState';

interface ProjectsListProps {
  projects: Project[];
  loading: boolean;
  onCreateProject: () => void;
}

export const ProjectsList = ({ projects, loading, onCreateProject }: ProjectsListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (projects.length === 0) {
    return <EmptyProjectsState onCreateProject={onCreateProject} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
