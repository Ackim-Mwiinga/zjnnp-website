import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import LoadingSpinner from '../LoadingSpinner';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          }>
            {children || <Outlet />}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default DashboardLayout;
