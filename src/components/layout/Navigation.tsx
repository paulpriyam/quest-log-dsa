import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, BookOpen } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">
            DSA Tracker
          </Link>
          
          <div className="flex gap-2">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Progress
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/problems' ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/problems" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Problems
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;