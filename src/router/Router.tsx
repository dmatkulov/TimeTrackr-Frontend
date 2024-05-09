import { createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '../utils/routes';
import Home from '../Home/Home';
import Login from '../features/users/Login';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Staff from '../features/adminPages/Staff';
import Page404 from '../components/UI/404/Page404';
import AppLayout from '../components/Layout/AppLayout';
import UserProfile from '../features/users/Profile';
import Positions from '../features/adminPages/Positions';

export const router = createBrowserRouter([
  {
    path: appRoutes.home,
    element: <AppLayout />,
    children: [
      {
        path: appRoutes.home,
        element: <Home />,
      },
      {
        path: appRoutes.login,
        element: <Login />,
      },
      {
        path: appRoutes.profile,
        element: <UserProfile />,
        children: [
          {
            path: appRoutes.staff,
            element: (
              <ProtectedRoute>
                <Staff />
              </ProtectedRoute>
            ),
          },
          {
            path: appRoutes.positions,
            element: (
              <ProtectedRoute>
                <Positions />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: appRoutes.notFound,
    element: <Page404 />,
  },
]);
