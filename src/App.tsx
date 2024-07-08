import AppLayout from './components/Layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './services/routes.service';
import Home from './containers/Home/Home';
import Page404 from './components/UI/404/Page404';
import Redirect from './containers/Redirect/Redirect';
import Protected from './components/ProtectedRoute/Protected';
import { useAppSelector } from './store/hooks/hooks';
import { selectUser } from './store/users/UsersSlice';
import Staff from './containers/Staff/Staff';
import StaffInfo from './containers/StaffInfo/StaffInfo';
import StaffContainer from './containers/StaffContainer/StaffContainer';
import Positions from './containers/Positions/Positions';
import UserPanel from './containers/UserPanel/UserPanel';
import UserInfoPage from './containers/UserProfileContainer/UserProfileContainer';
import CalendarPage from './containers/Calendar/CalendarPage';
import Dashboard from './containers/Dashboard/Dashboard';
import AuthPage from './containers/auth/AuthPage';

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
            path={appRoutes.admin.profile}
            element={
              <Protected isAllowed={user && user.role === 'admin'}>
                <UserPanel />
              </Protected>
            }
          >
            <Route path={appRoutes.admin.staff} element={<StaffContainer />}>
              <Route path={appRoutes.admin.staff} element={<Staff />} />
              <Route
                path={`${appRoutes.admin.staffInfo}/:id`}
                element={<StaffInfo />}
              />
            </Route>
            <Route path={appRoutes.admin.positions} element={<Positions />} />
          </Route>
          <Route
            path={appRoutes.employee.profile}
            element={
              <Protected isAllowed={user && user.role === 'employee'}>
                <UserPanel />
              </Protected>
            }
          >
            <Route
              path={appRoutes.employee.profileInfo}
              element={<UserInfoPage />}
            />
            <Route
              path={appRoutes.employee.dashboard}
              element={<Dashboard />}
            />
            <Route
              path={appRoutes.employee.calendar}
              element={<CalendarPage />}
            />
          </Route>
        </Routes>
      </AppLayout>
    </>
  );
};

export default App;
