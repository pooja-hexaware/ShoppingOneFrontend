import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const PostList = Loadable(lazy(() => import('./PostList')))
const EditPost = Loadable(lazy(() => import('./EditPost')))
const AddPost = Loadable(lazy(() => import('./AddPost')))

const PostRoutes = [
    {
        path: '/Post',
        element: <PostList />,
    },
    {
        path: '/Post/edit/:id',
        element: <EditPost />,
    },
    {
        path: '/Post/add',
        element: <AddPost />,
    },
]

export default PostRoutes
