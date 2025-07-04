import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Outlet 
} from 'react-router-dom';

// Layout and Main Components
import Layout from './components/Layout';
import MainContent from './components/MainContent';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import PicturePrognosis from './pages/PicturePrognosis';
import PeerReviewWaitlist from './pages/PeerReviewWaitlist';
import RoleSelectionPage from './pages/RoleSelectionPage';

// Dashboard Pages
import AuthorDashboard from './pages/dashboards/AuthorDashboard';
import ReviewerDashboard from './pages/dashboards/ReviewerDashboard';
import EditorDashboard from './pages/dashboards/EditorDashboard';
import PublisherDashboard from './pages/dashboards/PublisherDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

// Component Pages
import Specialties from './components/pages/Specialties';
import Resources from './components/pages/Resources';
import Channels from './components/pages/Channels';
import Partnerships from './components/pages/Partnerships';
import Newsroom from './components/pages/Newsroom';
import AboutUs from './components/pages/AboutUs';
import SignIn from './components/pages/SignIn';
import JoinNow from './components/pages/JoinNow';
import CompleteProfile from './components/pages/CompleteProfile';

// Context
import { useAuth } from './context/AuthContext';

// Separate component to handle dashboard redirection
const DashboardRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={`/dashboard/${user?.role || 'author'}`} replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout>
            <MainContent />
          </Layout>
        } />
        <Route path="/specialties" element={
          <Layout>
            <Specialties />
          </Layout>
        } />
        <Route path="/resources" element={
          <Layout>
            <Resources />
          </Layout>
        } />
        <Route path="/channels" element={
          <Layout>
            <Channels />
          </Layout>
        } />
        <Route path="/partnerships" element={
          <Layout>
            <Partnerships />
          </Layout>
        } />
        <Route path="/newsroom" element={
          <Layout>
            <Newsroom />
          </Layout>
        } />
        <Route path="/about-us" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />
        <Route path="/picture-prognosis" element={
          <Layout>
            <PicturePrognosis />
          </Layout>
        } />
        <Route path="/peer-review-waitlist" element={
          <Layout>
            <PeerReviewWaitlist />
          </Layout>
        } />
        <Route path="/sign-in" element={
          <Layout>
            <SignIn />
          </Layout>
        } />
        <Route path="/join-now" element={
          <Layout>
            <JoinNow />
          </Layout>
        } />
        <Route path="/complete-profile" element={
          <Layout>
            <CompleteProfile />
          </Layout>
        } />
        
        {/* Role Selection Page */}
        <Route path="/select-role" element={
          <ProtectedRoute>
            <Layout>
              <RoleSelectionPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Dashboard Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </ProtectedRoute>
        }>
          <Route path="/dashboard/author" element={<AuthorDashboard />} />
          <Route path="/dashboard/reviewer" element={<ReviewerDashboard />} />
          <Route path="/dashboard/editor" element={<EditorDashboard />} />
          <Route path="/dashboard/publisher" element={<PublisherDashboard />} />
          <Route 
            path="/dashboard/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect root dashboard to the user's role-specific dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard/home" replace />
              </ProtectedRoute>
            } 
          />
          
          {/* Home dashboard that shows role-specific content */}
          <Route 
            path="/dashboard/home" 
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            } 
          />
        </Route>
        
        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
