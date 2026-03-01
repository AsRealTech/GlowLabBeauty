import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import GuestLayout from 'layouts/GuestLayout';
import { Home } from '../views/public/Home';

// render - landing page
const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));
const Login = lazy(() => import('../views/auth/login'));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }, 
        {
         path: '/login',
         element: <Login />
        }
      ]
    },
    MainRoutes
  ]
  // { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;

