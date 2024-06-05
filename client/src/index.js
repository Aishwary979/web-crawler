import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Landing from './Landing';
import Search from './Search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path:"/landing",
    element: <Landing />
  },
  {
    path:"/search/*",
    element: <Search />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);