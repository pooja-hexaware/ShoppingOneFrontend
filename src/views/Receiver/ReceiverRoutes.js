import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ReceiverList = Loadable(lazy(() => import('./ReceiverList')))
const EditReceiver = Loadable(lazy(() => import('./EditReceiver')))
const AddReceiver = Loadable(lazy(() => import('./AddReceiver')))

const ReceiverRoutes = [
    {
        path: '/Receiver',
        element: <ReceiverList />,
    },
    {
        path: '/Receiver/edit/:id',
        element: <EditReceiver />,
    },
    {
        path: '/Receiver/add',
        element: <AddReceiver />,
    },
]

export default ReceiverRoutes
