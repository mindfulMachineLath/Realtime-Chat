import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'shared/hoc';
import { ROUTES } from './config';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Main } from './Main';
import { LayoutPage } from './Layout';

// TODO: изменить импорты страниц

// TODO: изменить названия страниц

import { Login } from './Login/Login';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LayoutPage />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

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
