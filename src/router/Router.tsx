import { createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '../utils/routes';
import Home from '../Home/Home';
import Login from '../features/users/Login';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import StaffTable from '../features/users/admin/StaffTable';
import Page404 from '../components/UI/404/Page404';
import AppLayout from '../components/Layout/AppLayout';
import UserPanel from '../features/users/UserPanel';
import PositionsTable from '../features/positions/PositionsTable';
import AuthPage from '../components/UI/AuthPage/AuthPage';
import StaffInfoPage from '../features/users/StaffInfoPage';
import StaffContainer from '../features/users/admin/StaffContainer';

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
            element: <StaffContainer />,
            handle: {
              link: appRoutes.admin.staff,
              title: 'Сотрудники',
            },
            children: [
              {
                path: appRoutes.admin.staff,
                element: <StaffTable />,
              },
              {
                path: appRoutes.admin.staff + '/profile/:id',
                element: <StaffInfoPage />,
                handle: {
                  link: appRoutes.admin.staff + '/profile/:id',
                  title: 'Профиль',
                },
              },
            ],
          },
          {
            path: appRoutes.admin.positions,
            element: <PositionsTable />,
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
