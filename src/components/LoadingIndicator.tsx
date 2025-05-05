
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="mt-2 text-sm text-gray-500">{message}</span>
    </div>
  );
};
