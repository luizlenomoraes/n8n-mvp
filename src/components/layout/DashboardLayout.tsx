
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import DashboardNav from './DashboardNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const userInitials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'U';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <SidebarProvider
      onOpenChange={(open) => setSidebarCollapsed(!open)}
    >
      <div className="min-h-screen flex bg-imageflow-background">
        <Sidebar className={`border-r ${sidebarCollapsed ? 'w-14' : 'w-60'} transition-all duration-300`}>
          <div className="h-16 flex items-center px-4 border-b">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-bold text-lg overflow-hidden whitespace-nowrap">
                {!sidebarCollapsed ? 'ImageFlow' : 'IF'}
              </span>
            </div>
            <div className="flex-grow" />
            <SidebarTrigger />
          </div>
          <SidebarContent className="p-2">
            <DashboardNav collapsed={sidebarCollapsed} />
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b bg-white flex items-center px-4 justify-between shadow-sm">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || 'User'} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.email && (
                        <p className="font-medium">{user.email}</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
