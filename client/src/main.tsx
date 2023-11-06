import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { Paths } from './path.ts';
import Login from './pages/Login';
import Register from './pages/Register';
import { ConfigProvider, theme } from 'antd';
import Auth from './features/auth/Auth.tsx';
import Employees from './pages/Employees/index.tsx';
import AddEmployee from './pages/AddEmployee/index.tsx';
import Status from './pages/Status/index.tsx';
import Employee from './pages/Employee/index.tsx';
import EditEployee from './pages/EditEmployee/index.tsx';

const router = createBrowserRouter([
    {
        path: Paths.home,
        element: <Employees />,
    },
    {
        path: Paths.login,
        element: <Login />,
    },
    {
        path: Paths.register,
        element: <Register />,
    },
    {
        path: `${Paths.employee}/:id`,
        element: <Employee />,
    },
    {
        path: Paths.employeeAdd,
        element: <AddEmployee />,
    },
    {
        path: `${Paths.employeeEdit}/:id`,
        element: <EditEployee />,
    },
    {
        path: `${Paths.status}/:status`,
        element: <Status />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Provider store={store}>
                <Auth>
                    <RouterProvider router={router} />
                </Auth>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);
