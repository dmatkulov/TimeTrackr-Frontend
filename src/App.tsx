import { Route, Routes } from 'react-router-dom';
import { appRoutes } from './utils/routes';
import Home from './Home/Home';
import Page404 from './components/UI/404/Page404';
import Login from './features/users/Login';
import UserProfile from './features/users/UserProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route path={appRoutes.profile} element={<UserProfile />} />
        <Route path={appRoutes.notFound} element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
