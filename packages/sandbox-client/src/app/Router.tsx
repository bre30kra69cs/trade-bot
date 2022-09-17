import React, {FC} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {MainPage} from './MainPage';
import {ProfilePage} from './ProfilePage';
import {NotFoundPage} from './NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
