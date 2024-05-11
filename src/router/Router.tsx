import { createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '../utils/routes';
import Home from '../Home/Home';
import Login from '../features/users/Login';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Staff from '../features/adminPages/Staff';
import Page404 from '../components/UI/404/Page404';
import AppLayout from '../components/Layout/AppLayout';
import UserPanel from '../features/users/UserPanel';
import Positions from '../features/adminPages/Positions';
import AuthPage from '../components/UI/AuthPage/AuthPage';

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
        path: appRoutes.admin.profile,
        element: (
          <ProtectedRoute>
            <UserPanel />
          </ProtectedRoute>
        ),
        children: [
          {
            path: appRoutes.admin.staff,
            element: <Staff />,
            handle: {
              link: appRoutes.admin.staff,
              title: 'Сотрудники',
            },
          },
          {
            path: appRoutes.admin.positions,
            element: <Positions />,
            handle: {
              link: appRoutes.admin.positions,
              title: 'Позиции',
            },
          },
        ],
      },
    ],
  },
  {
    path: appRoutes.auth,
    element: <AuthPage />,
  },
  {
    path: appRoutes.notFound,
    element: <Page404 />,
  },
]);
