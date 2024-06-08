import AppLayout from './components/Layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './utils/routes';
import Home from './Home/Home';
import Login from './features/users/Login';
import Page404 from './components/UI/404/Page404';
import AuthPage from './components/UI/AuthPage/AuthPage';
import Protected from './components/ProtectedRoute/Protected';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/UsersSlice';
import StaffTable from './features/users/admin/StaffTable';
import StaffInfo from './features/users/admin/StaffInfo';
import StaffContainer from './features/users/admin/StaffContainer';
import PositionsTable from './features/positions/PositionsTable';
import UserPanel from './features/users/UserPanel';
import UserInfoPage from './features/users/employee/EmployeeInfo';
import TasksTable from './features/users/employee/components/TasksTable';
import CalendarPage from './features/users/employee/CalendarPage';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path={appRoutes.home} element={<Home />} />
          <Route path={appRoutes.login} element={<Login />} />
          <Route path={appRoutes.auth} element={<AuthPage />} />
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
              <Route path={appRoutes.admin.staff} element={<StaffTable />} />
              <Route
                path={`${appRoutes.admin.staffInfo}/:id`}
                element={<StaffInfo />}
              />
            </Route>
            <Route
              path={appRoutes.admin.positions}
              element={<PositionsTable />}
            />
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
            <Route path={appRoutes.employee.today} element={<TasksTable />} />
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
