import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const ReviewList = Loadable(lazy(() => import('./ReviewList')))
const EditReview = Loadable(lazy(() => import('./EditReview')))
const AddReview = Loadable(lazy(() => import('./AddReview')))

const ReviewRoutes = [
    {
        path: '/Review',
        element: <ReviewList />,
    },
    {
        path: '/Review/edit/:id',
        element: <EditReview />,
    },
    {
        path: '/Review/add',
        element: <AddReview />,
    },
]

export default ReviewRoutes
