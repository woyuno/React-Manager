import Layout from '@/layout/layout'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import Login from '@/views/login/login'
import Dept from '@/views/system/dept/dept'
import Menu from '@/views/system/menu/menu'
import User from '@/views/system/user/user'
import Welcome from '@/views/welcome/welcome'
import { Navigate, useRoutes } from 'react-router-dom'

const routerConfig = [
  {
    path: '/',
    element: <Navigate to='/welcome' />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/dashboard',
        element: <div>s</div>,
      },
      {
        path: '/userList',
        element: <User />,
      },
      {
        path: '/deptList',
        element: <Dept />,
      },
      {
        path: '/menuList',
        element: <Menu />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
  {
    path: '/403',
    element: <Error403 />,
  },
  {
    path: '/404',
    element: <Error404 />,
  },
]

export default function Router() {
  return useRoutes(routerConfig)
}

// const router = createBrowserRouter(routerConfig)
// export default router
