
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-imageflow-primary">ImageFlow</span>
            </div>
            <nav className="flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#howitworks" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                How It Works
              </a>
            </nav>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-24 bg-gradient-to-br from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform your scripts into</span>
              <span className="block text-imageflow-primary">beautiful images</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              ImageFlow helps you convert script paragraphs into stunning visuals, automatically. Perfect for storyboarding, presentations, and content creation.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg transform skew-y-2 -rotate-1 rounded-3xl"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="ImageFlow Dashboard"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to transform your scripts into visual stories.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-imageflow-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Script to Image Conversion</h3>
              <p className="mt-2 text-base text-gray-500">
                Convert each paragraph of your script into a unique, contextually relevant image.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-imageflow-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Multiple Visual Styles</h3>
              <p className="mt-2 text-base text-gray-500">
                Choose between minimalist and comic-inspired visual styles for your images.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-imageflow-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Google Drive Integration</h3>
              <p className="mt-2 text-base text-gray-500">
                All generated images are automatically saved to your Google Drive for easy access.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-imageflow-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Real-Time Status Updates</h3>
              <p className="mt-2 text-base text-gray-500">
                Track the progress of your image generation in real-time with status updates.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-imageflow-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Secure Multitenancy</h3>
              <p className="mt-2 text-base text-gray-500">
                Each user only sees and manages their own projects and images, with secure authentication.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-md bg-imageflow-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Easy Image Download</h3>
              <p className="mt-2 text-base text-gray-500">
                Download individual images or zip all images from a project with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howitworks" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Turn your scripts into visuals in just a few simple steps.
            </p>
          </div>
          <div className="mt-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-px w-full bg-gray-200" />
            </div>
            <div className="relative flex justify-around">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-imageflow-primary mx-auto">
                  <span className="text-white font-medium">1</span>
                </div>
                <div className="mt-3 px-2">
                  <h3 className="text-lg font-medium text-gray-900">Create a Project</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your project title and script with each paragraph as a scene.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-imageflow-primary mx-auto">
                  <span className="text-white font-medium">2</span>
                </div>
                <div className="mt-3 px-2">
                  <h3 className="text-lg font-medium text-gray-900">Choose a Style</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Select between minimalist or comic-style visuals for your images.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-imageflow-primary mx-auto">
                  <span className="text-white font-medium">3</span>
                </div>
                <div className="mt-3 px-2">
                  <h3 className="text-lg font-medium text-gray-900">Process Automatically</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Our system processes your script and creates images for each paragraph.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-imageflow-primary mx-auto">
                  <span className="text-white font-medium">4</span>
                </div>
                <div className="mt-3 px-2">
                  <h3 className="text-lg font-medium text-gray-900">Get Your Images</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Download or access images directly from your Google Drive folder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform your scripts into images?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-100">
            Get started with ImageFlow today and see your scripts come to life.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="default" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link to="/signup">Sign Up Now — It's Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="mt-8 text-center text-gray-400">&copy; 2024 ImageFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
