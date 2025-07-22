import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="inline-flex p-4 bg-gradient-primary rounded-full mb-4">
            <Calculator className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The calculator or converter you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-primary text-white hover:shadow-medium transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/calculator/basic')}
            className="w-full hover:bg-muted"
          >
            Open Basic Calculator
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;