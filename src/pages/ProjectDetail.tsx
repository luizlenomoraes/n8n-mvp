
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { fetchProjectWithImages, subscribeToProject, subscribeToProjectImages } from '@/services/projectService';
import { Project, ProjectImage } from '@/types';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjectWithImages = async () => {
      if (!id) return;
      
      try {
        const { project: projectData, images: imagesData } = await fetchProjectWithImages(id);
        setProject(projectData);
        setImages(imagesData);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load project details. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProjectWithImages();

    // Set up realtime subscriptions
    if (id) {
      const unsubscribeProject = subscribeToProject(id, (updatedProject) => {
        setProject((prev) => {
          if (!prev || prev.status !== updatedProject.status) {
            toast({
              title: 'Project Updated',
              description: `Project status changed to: ${updatedProject.status}`,
            });
          }
          return updatedProject;
        });
      });

      const unsubscribeImages = subscribeToProjectImages(id, (newImage) => {
        setImages((prev) => {
          const exists = prev.some((img) => img.id === newImage.id);
          if (!exists) {
            toast({
              title: 'New Image',
              description: 'A new image has been generated for your project.',
            });
            return [...prev, newImage].sort((a, b) => a.scene_number - b.scene_number);
          }
          return prev;
        });
      });

      return () => {
        unsubscribeProject();
        unsubscribeImages();
      };
    }
  }, [id, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Em Progresso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Concluído':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const openDriveFolder = () => {
    // This should be implemented to open the user's Google Drive folder
    // We'll need to get the folder ID from the user's profile
    toast({
      title: 'Opening Drive Folder',
      description: 'Redirecting to your Google Drive folder...',
    });
  };

  const downloadZip = () => {
    // This would need to be implemented with a backend endpoint
    toast({
      title: 'Download Started',
      description: 'Your images are being prepared for download.',
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{project.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            <p className="text-muted-foreground">
              Created on {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={openDriveFolder}>
              Open Drive Folder
            </Button>
            <Button onClick={downloadZip} disabled={images.length === 0}>
              Download All
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Style</h3>
              <p>{project.style}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Script</h3>
              <p className="whitespace-pre-line">{project.script}</p>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Generated Images</h2>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="grid">
            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="border rounded-md overflow-hidden">
                    <img
                      src={image.url}
                      alt={`Scene ${image.scene_number}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3 flex justify-between items-center">
                      <p className="font-medium">Scene {image.scene_number}</p>
                      <a
                        href={image.url}
                        download={`scene-${image.scene_number}.jpg`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-1">No images yet</h3>
                <p className="text-muted-foreground">
                  {project.status === 'Pendente' || project.status === 'Em Progresso'
                    ? 'Your images are being generated. Please check back soon.'
                    : 'No images have been generated for this project.'}
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="list">
            {images.length > 0 ? (
              <div className="space-y-4">
                {images.map((image) => (
                  <Card key={image.id}>
                    <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center">
                      <img
                        src={image.url}
                        alt={`Scene ${image.scene_number}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">Scene {image.scene_number}</h3>
                        <p className="text-sm text-muted-foreground">
                          Generated on {new Date(image.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={image.drive_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View in Drive
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <a
                            href={image.url}
                            download={`scene-${image.scene_number}.jpg`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-md">
                <h3 className="text-lg font-semibold mb-1">No images yet</h3>
                <p className="text-muted-foreground">
                  {project.status === 'Pendente' || project.status === 'Em Progresso'
                    ? 'Your images are being generated. Please check back soon.'
                    : 'No images have been generated for this project.'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
