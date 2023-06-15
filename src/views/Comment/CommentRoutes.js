import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const CommentList = Loadable(lazy(() => import('./CommentList')))
const EditComment = Loadable(lazy(() => import('./EditComment')))
const AddComment = Loadable(lazy(() => import('./AddComment')))

const CommentRoutes = [
    {
        path: '/Comment',
        element: <CommentList />,
    },
    {
        path: '/Comment/edit/:id',
        element: <EditComment />,
    },
    {
        path: '/Comment/add',
        element: <AddComment />,
    },
]

export default CommentRoutes
