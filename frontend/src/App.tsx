import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/layout/Layout'
import { ToastContainer } from './components/ui/ToastContainer'
import { AuthPage } from './pages/AuthPage'
import { Dashboard } from './pages/Dashboard'
import { HomePage } from './pages/HomePage'


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, checkedAuth } = useAuth()

  if (loading || !checkedAuth) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100">
        </div>
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/auth" replace />
  }
  return <Layout>{children}</Layout>
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading, checkedAuth } = useAuth()

  if (loading || !checkedAuth) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100">
        </div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}

const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
      }
      />
      <Route path="/clients" element={
        <ProtectedRoute>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Clients Module</h2>
            <p className="text-slate-600 dark:text-slate-400">Client management features coming soon...</p>
          </div>
        </ProtectedRoute>
      }
      />
      <Route path="/projects"
      element={
        <ProtectedRoute>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Projects Module</h2>
            <p className="text-slate-600 dark:text-slate-400">Project management features coming soon...</p>
          </div>
        </ProtectedRoute>
      }
      />
      <Route path="/invoices"
      element={
        <ProtectedRoute>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Invoices Module</h2>
            <p className="text-slate-600 dark:text-slate-400">Project management features coming soon...</p>
          </div>
        </ProtectedRoute>
      }
      />
      <Route path="/notes"
      element={
        <ProtectedRoute>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Notes Module</h2>
            <p className="text-slate-600 dark:text-slate-400">Project management features coming soon...</p>
          </div>
        </ProtectedRoute>
      }
      />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen transition-colors">
              <AppRoutes />
              <ToastContainer />
            </div>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App