import React from 'react';
import { Breadcrumb } from 'antd';
import { appRoutes } from '../../../utils/routes';

const Breadcrumbs: React.FC = () => (
  <Breadcrumb
    items={[
      {
        title: <a href={appRoutes.home}>Главная</a>,
      },
      {
        title: <a href={appRoutes.login}>Вход</a>,
      },
    ]}
  />
);

export default Breadcrumbs;
