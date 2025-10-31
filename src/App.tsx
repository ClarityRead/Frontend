import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"; 
import Introduction from './pages/Introduction'
import Papers from './pages/Papers'
import Paper from './pages/Paper'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/navbar'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/auth'
import ProtectedRoute from './wrappers/protected_route'

function Layout() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
      <Toaster />
    </AuthProvider>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Introduction />,
        },
        {
          path: "papers",
          element: <Papers />,
        },
        {
          path: "papers/:id",
          element: (
            <ProtectedRoute>
              <Paper />
            </ProtectedRoute>
          ),
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;