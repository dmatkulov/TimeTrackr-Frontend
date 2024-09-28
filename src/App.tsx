import AppLayout from './components/Layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './common/routes';
import Home from './containers/Home/Home';
import Page404 from './components/UI/404/Page404';
import Redirect from './containers/Redirect/Redirect';
import Protected from './components/ProtectedRoute/Protected';
import UserPanel from './containers/UserPanel/UserPanel';
import UserProfile from './containers/UserProfile/UserProfile';
import CalendarPage from './containers/Calendar/CalendarPage';
import Dashboard from './containers/Dashboard/Dashboard';
import Auth from './containers/Auth/Auth';
import Desk from './containers/Notes/Desk';
import Projects from './containers/Projects/Projects';
import { Roles } from './enum/roles.enum';
import { useAppSelector } from './store/hooks/hooks';
import { selectUser } from './store/services/auth/authSlice';
import Teams from './containers/Teams/Teams';
import TeamInfo from './containers/Teams/TeamInfo';
import TeamProject from './containers/Projects/TeamProject';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.auth} element={<Auth />} />
          <Route path={appRoutes.redirect} element={<Redirect />} />
          <Route path={appRoutes.notFound} element={<Page404 />} />
          <Route
            path={appRoutes.user.profile}
            element={
              <Protected isAllowed={user && user?.roles?.includes(Roles.User)}>
                <UserPanel />
              </Protected>
            }
          >
            <Route path={appRoutes.user.account} element={<UserProfile />} />
            <Route path={appRoutes.user.dashboard} element={<Dashboard />} />
            <Route path={appRoutes.user.desk} element={<Desk />} />
            <Route path={appRoutes.user.teams} element={<Teams />} />
            <Route path={appRoutes.user.teams + ':id'} element={<TeamInfo />} />
            <Route path={appRoutes.user.projects} element={<Projects />} />
            <Route
              path={appRoutes.user.teams + ':teamId/:projectId'}
              element={<TeamProject />}
            />
            <Route path={appRoutes.user.calendar} element={<CalendarPage />} />
          </Route>
        </Routes>
      </AppLayout>
    </>
  );
};

export default App;
