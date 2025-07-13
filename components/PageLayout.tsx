
import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <main className="container mx-auto px-6 py-12 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-pink-500/50 to-yellow-500/50 rounded-full blur-sm"></div>
      {children}
    </main>
  );
};

export default PageLayout;
