import { createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '../utils/routes';
import Home from '../Home/Home';
import Login from '../features/users/Login';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Staff from '../features/adminPages/Staff';
import Page404 from '../components/UI/404/Page404';
import AppLayout from '../components/Layout/AppLayout';

export const router = createBrowserRouter([
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
    element: <AppLayout />,
    children: [
      {
        path: appRoutes.staff,
        element: (
          <ProtectedRoute>
            <Staff />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: appRoutes.notFound,
    element: <Page404 />,
  },
]);
