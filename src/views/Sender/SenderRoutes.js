import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const SenderList = Loadable(lazy(() => import('./SenderList')))
const EditSender = Loadable(lazy(() => import('./EditSender')))
const AddSender = Loadable(lazy(() => import('./AddSender')))

const SenderRoutes = [
    {
        path: '/Sender',
        element: <SenderList />,
    },
    {
        path: '/Sender/edit/:id',
        element: <EditSender />,
    },
    {
        path: '/Sender/add',
        element: <AddSender />,
    },
]

export default SenderRoutes
