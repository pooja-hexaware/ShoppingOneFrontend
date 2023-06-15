import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const UserList = Loadable(lazy(() => import('./UserList')))
const EditUser = Loadable(lazy(() => import('./EditUser')))
const AddUser = Loadable(lazy(() => import('./AddUser')))

const UserRoutes = [
    {
        path: '/User',
        element: <UserList />,
    },
    {
        path: '/User/edit/:id',
        element: <EditUser />,
    },
    {
        path: '/User/add',
        element: <AddUser />,
    },
]

export default UserRoutes
