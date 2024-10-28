import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';


import SuspenseLoader from '../../../tripwhiz/src/components/SuspenseLoader';
import qnaRouter from './qnaRouter';
import faqRouter from './faqRouter';
import boaRouter from './boardRouter';
import SidebarLayout from '../../../tripwhiz/src/layouts/SidebarLayout';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('../../../tripwhiz/src/content/overview')));

// Dashboards
const Crypto = Loader(lazy(() => import('../../../tripwhiz/src/content/dashboards/Crypto')));

// Applications
const Messenger = Loader(
  lazy(() => import('../../../tripwhiz/src/content/applications/Messenger'))
);

// Status
const Status404 = Loader(
  lazy(() => import('../../../tripwhiz/src/content/pages/Status/Status404'))
);


const mainRouter: RouteObject[] = [
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Crypto />
      },
      {
        path: '*',
        element: <Status404 />
      },
      ...qnaRouter,
      ...faqRouter,
      ...boaRouter
    ]
  },
  // {
  //   path: 'dashboards',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="crypto" replace />
  //     },
  //     {
  //       path: 'crypto',
  //       element: <Crypto />
  //     },
  //     {
  //       path: 'messenger',
  //       element: <Messenger />
  //     }
  //   ]
  // }
];





export default mainRouter