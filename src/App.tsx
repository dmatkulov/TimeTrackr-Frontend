import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './utils/routes';
import Home from './Home/Home';
import Page404 from './components/UI/404/Page404';
import Login from './features/users/Login';
import UserProfile from './features/users/UserProfile';
import AppLayout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/UsersSlice';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route
          path={appRoutes.profile}
          element={
            <AppLayout>
              <ProtectedRoute
                isAllowed={
                  user && (user.role === 'user' || user.role === 'admin')
                }
              >
                <UserProfile />
              </ProtectedRoute>
            </AppLayout>
          }
        />
        <Route path={appRoutes.notFound} element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
