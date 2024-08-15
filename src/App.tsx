import AppLayout from './components/Layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './services/routes.service';
import Home from './containers/Home/Home';
import Page404 from './components/UI/404/Page404';
import Redirect from './containers/Redirect/Redirect';
import Protected from './components/ProtectedRoute/Protected';
import UserPanel from './containers/UserPanel/UserPanel';
import UserProfilePage from './containers/UserProfilePage/UserProfilePage';
import CalendarPage from './containers/Calendar/CalendarPage';
import Dashboard from './containers/Dashboard/Dashboard';
import AuthPage from './containers/auth/AuthPage';
import Notes from './containers/Notes/Notes';
import Teams from './containers/Teams/Teams';
import Projects from './containers/Projects/Projects';
import { Roles } from './enum/roles.enum';
import { useAppSelector } from './store/hooks/hooks';
import { selectUser } from './store/features/auth/authSlice';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.auth} element={<AuthPage />} />
          <Route path={appRoutes.redirect} element={<Redirect />} />
          <Route path={appRoutes.notFound} element={<Page404 />} />
          <Route
            path={appRoutes.user.profile}
            element={
              <Protected isAllowed={user && user.role === Roles.User}>
                <UserPanel />
              </Protected>
            }
          >
            <Route
              path={appRoutes.user.account}
              element={<UserProfilePage />}
            />
            <Route path={appRoutes.user.dashboard} element={<Dashboard />} />
            <Route path={appRoutes.user.notes} element={<Notes />} />
            <Route path={appRoutes.user.teams} element={<Teams />} />
            <Route path={appRoutes.user.projects} element={<Projects />} />
            <Route path={appRoutes.user.calendar} element={<CalendarPage />} />
          </Route>
        </Routes>
      </AppLayout>
    </>
  );
};

export default App;
