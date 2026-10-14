import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileDock } from './components/layout/MobileDock';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { OAuthCallback } from './pages/auth/OAuthCallback';
import { PublicProfilePage } from './pages/public/PublicProfile';
import { PostsListPage } from './pages/public/PostsList';
import { PostDetailPage } from './pages/public/PostDetail';

// Student Pages
import { StudentDashboard } from './pages/student/Dashboard';
import { StudentProfilePage } from './pages/student/Profile';
import { StudentProjectsPage } from './pages/student/Projects';
import { StudentEvidencePage } from './pages/student/Evidence';
import { StudentIntegrationsPage } from './pages/student/Integrations';
import { StudentPostsPage } from './pages/student/Posts';
import { StudentSettingsPage } from './pages/student/Settings';

// Recruiter Pages
import { RecruiterDashboard } from './pages/recruiter/Dashboard';
import { RecruiterCandidatesPage } from './pages/recruiter/Candidates';
import { RecruiterCandidateDetailPage } from './pages/recruiter/CandidateDetail';
import { RecruiterJobsPage } from './pages/recruiter/Jobs';
import { RecruiterShortlistsPage } from './pages/recruiter/Shortlists';

const queryClient = new QueryClient();

// Route Guards
const ProtectedStudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-12 text-center text-slate-400 font-mono text-xs">Authenticating...</div>;
  if (!isAuthenticated || user?.role !== 'STUDENT') {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex w-full max-w-full overflow-x-hidden min-w-0">
      <Sidebar />
      <main className="flex-1 w-full max-w-full min-w-0 pb-24 md:pb-8">{children}</main>
    </div>
  );
};

const ProtectedRecruiterRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-12 text-center text-slate-400 font-mono text-xs">Authenticating...</div>;
  if (!isAuthenticated || user?.role !== 'RECRUITER') {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex w-full max-w-full overflow-x-hidden min-w-0">
      <Sidebar />
      <main className="flex-1 w-full max-w-full min-w-0 pb-24 md:pb-8">{children}</main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#080c16] text-slate-100 flex flex-col font-sans relative">
            <Navbar />
            <div className="flex-1 w-full max-w-full min-w-0">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<OAuthCallback />} />
                <Route path="/u/:username" element={<PublicProfilePage />} />
                <Route path="/posts" element={<PostsListPage />} />
                <Route path="/posts/:slug" element={<PostDetailPage />} />

                {/* Student Workspace */}
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedStudentRoute>
                      <StudentDashboard />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/student/profile"
                  element={
                    <ProtectedStudentRoute>
                      <StudentProfilePage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/student/projects"
                  element={
                    <ProtectedStudentRoute>
                      <StudentProjectsPage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/student/evidence"
                  element={
                    <ProtectedStudentRoute>
                      <StudentEvidencePage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/student/integrations"
                  element={
                    <ProtectedStudentRoute>
                      <StudentIntegrationsPage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/student/posts"
                  element={
                    <ProtectedStudentRoute>
                      <StudentPostsPage />
                    </ProtectedStudentRoute>
                  }
                />
                <Route
                  path="/student/settings"
                  element={
                    <ProtectedStudentRoute>
                      <StudentSettingsPage />
                    </ProtectedStudentRoute>
                  }
                />

                {/* Recruiter Workspace */}
                <Route
                  path="/recruiter/dashboard"
                  element={
                    <ProtectedRecruiterRoute>
                      <RecruiterDashboard />
                    </ProtectedRecruiterRoute>
                  }
                />
                <Route
                  path="/recruiter/candidates"
                  element={
                    <ProtectedRecruiterRoute>
                      <RecruiterCandidatesPage />
                    </ProtectedRecruiterRoute>
                  }
                />
                <Route
                  path="/recruiter/candidates/:id"
                  element={
                    <ProtectedRecruiterRoute>
                      <RecruiterCandidateDetailPage />
                    </ProtectedRecruiterRoute>
                  }
                />
                <Route
                  path="/recruiter/jobs"
                  element={
                    <ProtectedRecruiterRoute>
                      <RecruiterJobsPage />
                    </ProtectedRecruiterRoute>
                  }
                />
                <Route
                  path="/recruiter/shortlists"
                  element={
                    <ProtectedRecruiterRoute>
                      <RecruiterShortlistsPage />
                    </ProtectedRecruiterRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <MobileDock />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};
