import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'shared/hoc';
import { ROUTES } from './config';
import { Home } from './Home/Home';
import { LayoutPage } from './Layout';
import { Login } from './Login/Login';
import { Main } from './Main/Main';
import { NotFound } from './NotFound/NotFound';
import { SignUp } from './Signup/Signup';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LayoutPage />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route
          path={ROUTES.MAIN}
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routing;
