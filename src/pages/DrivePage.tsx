
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { getUserDriveFolder, provisionDriveFolder } from '@/lib/supabase';

export default function DrivePage() {
  const [driveFolder, setDriveFolder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [provisioning, setProvisioning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDriveFolder = async () => {
      try {
        const folderId = await getUserDriveFolder();
        setDriveFolder(folderId || null);
      } catch (error) {
        console.error('Failed to fetch Drive folder:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your Drive folder information.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDriveFolder();
  }, [toast]);

  const handleProvisionDriveFolder = async () => {
    setProvisioning(true);
    try {
      const { folderId } = await provisionDriveFolder();
      setDriveFolder(folderId);
      toast({
        title: 'Drive Folder Created',
        description: 'Your Google Drive folder has been successfully created.',
      });
    } catch (error) {
      console.error('Failed to provision Drive folder:', error);
      toast({
        title: 'Error',
        description: 'Failed to create your Drive folder. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setProvisioning(false);
    }
  };

  const openDriveFolder = () => {
    if (driveFolder) {
      window.open(`https://drive.google.com/drive/folders/${driveFolder}`, '_blank');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Google Drive Integration</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
          </div>
        ) : driveFolder ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Drive Folder</CardTitle>
              <CardDescription>
                Your Google Drive folder is configured and ready to use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">
                    Google Drive folder is connected
                  </p>
                  <p className="text-sm text-green-600">
                    All your generated images are being saved to this folder.
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={openDriveFolder}>Open Drive Folder</Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Drive Folder Setup</CardTitle>
              <CardDescription>
                You need to set up a Google Drive folder to store your generated images.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="font-medium text-yellow-800">
                  Google Drive folder not configured
                </p>
                <p className="text-sm text-yellow-600 mt-1">
                  A Google Drive folder will be created to store all your generated images.
                  You'll be able to access and share these images directly from Google Drive.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProvisionDriveFolder} disabled={provisioning}>
                {provisioning ? <LoadingSpinner size="small" className="mr-2" /> : null}
                Create Drive Folder
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Google Drive Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">How it works</h3>
                <p className="text-sm text-muted-foreground">
                  When you create a project, our system processes your script and generates images.
                  These images are automatically saved to your Google Drive folder for easy access.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold">Benefits</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Easy access to all your generated images</li>
                  <li>Share images directly from Google Drive</li>
                  <li>Download high-resolution versions of your images</li>
                  <li>Organize your projects in folders</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold">Permissions</h3>
                <p className="text-sm text-muted-foreground">
                  ImageFlow only has access to the specific folder created for your account.
                  We cannot access any other files or folders in your Google Drive.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
