import { lazy } from 'react';

import AdminLayout from 'layouts/AdminLayout';
import GuestLayout from 'layouts/GuestLayout';

const DashboardSales = lazy(() => import('../views/dashboard/DashSales/index'));

const Products = lazy(() => import('../views/dashboard/Products'));
const Ingredients = lazy(() => import('../views/dashboard/Ingredients'));
const Tips = lazy(() => import('../views/dashboard/Tips'));
const Settings = lazy(() => import('../views/dashboard/Settings'));


const Home = lazy(() => import('../views/public/Home'));
const Login = lazy(() => import('../views/auth/login'));
const Register = lazy(() => import('../views/auth/register'));


const MainRoutes = {
  path: '/',
  children: [
        {
      path: '/',
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    },
    {
      path: '/user',
      element: <AdminLayout />,
      children: [
        {
          path: '/user/',
          element: <DashboardSales />
        },
        {
          path: 'dashboard',
          element: <DashboardSales />
        },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'ingredients',
          element: <Ingredients />
        },
        {
          path: 'Tips',
          element: <Tips />
        },
        {
          path: 'Settings',
          element: <Settings />
        },

        {
          path: 'sample-page',
          element: <Sample />
        },
        {
          path: '*',
          element: <h1>Not Found</h1>
        }
      ]
    }

  ]
};

export default MainRoutes;
