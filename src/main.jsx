import { createRoot } from 'react-dom/client';
import './index.css';
import 'swiper/css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AddCard from './Pages/AddCard.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Orders from './Pages/Oders.jsx';
import EditProduct from './Pages/EditCard.jsx';
import Products from './Pages/Products.jsx';
import Login from './Pages/Login.jsx';
import Layout from './Layout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Settings from './Pages/Setting.jsx';
import Help from './Pages/Help.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },

      {
        path: "Login",
        element: <Login />,
      },

      // 🔐 Protected Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "AddCard",
            element: <AddCard />,
          },
          {
            path: "Products",
            element: <Products />,
          },
          {
            path: "EditProduct/:id",
            element: <EditProduct />,
          },
          {
            path: "Orders",
            element: <Orders />,
          },
          {
            path: "Setting",
            element: <Settings />,
          },
          {
            path: "Help",
            element: <Help />,
          },
        ],
      },

      {
        path: "*",
        element: (
          <h1 className="text-center mt-20 text-3xl font-bold">
            NOT FOUND
          </h1>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);