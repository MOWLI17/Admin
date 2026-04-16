import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Loader from './components/dashboard/Loader';
import { DashboardProvider } from './context/DashboardContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy loading for optimized performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const Workforce = lazy(() => import('./pages/Workforce'));
const Directory = lazy(() => import('./pages/Directory'));
const MessagingPage = lazy(() => import('./pages/MessagingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f1f5f9] text-slate-800 selection:bg-[#1e40af]/30 font-sans overflow-x-hidden">
        {user && <Sidebar />}
        
        <div className={`flex-1 flex flex-col ${user ? 'lg:pl-64' : ''} w-full min-w-0`}>
          {user && <Header />}
          <main className="flex-1 transition-opacity duration-300 w-full overflow-x-hidden p-4 md:p-0">
            <Suspense fallback={<Loader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />

                {/* Protected Routes */}
                <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/calendar" element={user ? <CalendarPage /> : <Navigate to="/login" />} />
                <Route path="/workforce" element={user ? <Workforce /> : <Navigate to="/login" />} />
                <Route path="/directory" element={user ? <Directory /> : <Navigate to="/login" />} />
                <Route path="/messages" element={user ? <MessagingPage /> : <Navigate to="/login" />} />
                
                <Route 
                  path="*" 
                  element={
                    <div className="flex h-[80vh] items-center justify-center text-center">
                      <h2 className="text-4xl font-black text-[#1e293b]">Module Coming Soon</h2>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <AppContent />
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
