import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'

import Home from './routes/Home';
import ErrorPage from './error-page';
import Form from './routes/Form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: "/form",
        element: <Form/>,
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
