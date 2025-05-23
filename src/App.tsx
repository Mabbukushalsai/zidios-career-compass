
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GuestLogin from "./pages/GuestLogin";
import JobsPage from "./pages/JobsPage";
import CoursesPage from "./pages/CoursesPage";
import MockTestPage from "./pages/MockTestPage";
import HackathonsPage from "./pages/HackathonsPage";
import SymposiumsPage from "./pages/SymposiumsPage";
import WalkInDrivesPage from "./pages/WalkInDrivesPage";
import StudyMaterialsPage from "./pages/StudyMaterialsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isGuest } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/guest-login" element={<GuestLogin />} />
      
      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']} allowGuest={true}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      
      {/* Company Routes */}
      <Route path="/company" element={
        <ProtectedRoute allowedRoles={['company']} allowGuest={true}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']} allowGuest={true}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      {/* Shared Routes */}
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/mock-tests" element={<MockTestPage />} />
      <Route path="/hackathons" element={<HackathonsPage />} />
      <Route path="/symposiums" element={<SymposiumsPage />} />
      <Route path="/walkin-drives" element={<WalkInDrivesPage />} />
      <Route path="/study-materials" element={<StudyMaterialsPage />} />
      
      {/* Default redirect based on user role */}
      <Route path="/" element={
        user ? (
          user.role === 'student' ? <Navigate to="/student" /> :
          user.role === 'company' ? <Navigate to="/company" /> :
          user.role === 'admin' ? <Navigate to="/admin" /> :
          <Navigate to="/login" />
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <AppRoutes />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
