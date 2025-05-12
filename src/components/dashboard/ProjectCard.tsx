
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
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
  );
};
