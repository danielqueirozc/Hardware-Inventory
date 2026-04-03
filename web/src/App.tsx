import { Introduction } from "./components/introduction";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from "./components/login";
import { Register } from "./components/register";
import { DashboardMobile } from "./components/mobile/dashboard-mobile";
import { useAuthStore } from "./context/auth-store";
import { useEffect, useState } from "react";
import { ItemsPage } from "./components/ui/items-page";
import   { ProfileMobile } from "./components/mobile/profile-mobile";
import { Dashboard } from "./components/dashboard";
import { Profile } from "./components/profile";

function PrivateRoute ({ children }: { children: React.ReactNode }) {
const { isAuthenticated } = useAuthStore()

  return isAuthenticated ?  <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()

  return isAuthenticated ? <Navigate to='/dashboard' replace /> : <>{children}</>
}
 
export function App() {
  // const { token, checkAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024)

  useEffect(() => {
    async function verify() {
      // Aguarda a hidratação terminar
      await useAuthStore.persist.rehydrate()
      
      const token = useAuthStore.getState().token
      
      
      if (token) {
        const checkAuth = useAuthStore.getState().checkAuth
        await checkAuth()
      }
      
      setIsLoading(false)
    }
    
    verify()
  }, [])

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isLargeScreen])

  
  if (isLoading) return <p>Carregando...</p>

  return (
    <BrowserRouter>
      <Routes>

       <Route path="/" element={<Introduction />} />

        <Route 
          path="/introduction" 
          element={
            <PublicRoute>
              <Introduction />
            </PublicRoute>
          } 
        />
        <Route
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              {isLargeScreen ? (
                <Dashboard />
              ) : (
                <DashboardMobile />
              )}
            </PrivateRoute>
          } 
        />
        <Route 
          path={'/items/:type'}
          element={
            <PrivateRoute>
              <ItemsPage />
            </PrivateRoute>
          } 
        />
         <Route 
          path={'/profile'}
          element={
            <PrivateRoute>
              {isLargeScreen ? (
                <Profile />
              ) : (
                <ProfileMobile />
              )}
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}
