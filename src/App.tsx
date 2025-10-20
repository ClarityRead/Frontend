import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router";
import Introduction from './pages/Introduction'
import Papers from './pages/Papers'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/navbar'

// Layout component that includes the navbar
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          Component: Introduction,
        },
        {
          path: "/papers",
          Component: Papers,
        },
        {
          path: "/signup",
          Component: Signup,
        },
        {
          path: "/login",
          Component: Login,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App