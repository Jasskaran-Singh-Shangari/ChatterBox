import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import Homepage from './route/Homepage.jsx'
import SignUpPage from './route/SignUpPage.jsx'
import LoginPage from './route/LoginPage.jsx'
import Settings from './route/Settings.jsx'
import ProfilePage from './route/ProfilePage.jsx'
import ProtectedRoute from './route/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast'


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />, 
        children: [
          {
            path: '/',
            element: <Homepage />
          },
          {
            path: '/settings',
            element: <Settings />
          },
          {
            path: '/profile',
            element: <ProfilePage />
          }
        ]
      },
      {
        path: '/signUp',
        element: <SignUpPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
    <Toaster />
  </StrictMode>
)
