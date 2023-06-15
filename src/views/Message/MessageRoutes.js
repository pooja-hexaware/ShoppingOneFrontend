import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const MessageList = Loadable(lazy(() => import('./MessageList')))
const EditMessage = Loadable(lazy(() => import('./EditMessage')))
const AddMessage = Loadable(lazy(() => import('./AddMessage')))

const MessageRoutes = [
    {
        path: '/Message',
        element: <MessageList />,
    },
    {
        path: '/Message/edit/:id',
        element: <EditMessage />,
    },
    {
        path: '/Message/add',
        element: <AddMessage />,
    },
]

export default MessageRoutes
