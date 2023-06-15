import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const OrderItemList = Loadable(lazy(() => import('./OrderItemList')))
const EditOrderItem = Loadable(lazy(() => import('./EditOrderItem')))
const AddOrderItem = Loadable(lazy(() => import('./AddOrderItem')))

const OrderItemRoutes = [
    {
        path: '/OrderItem',
        element: <OrderItemList />,
    },
    {
        path: '/OrderItem/edit/:id',
        element: <EditOrderItem />,
    },
    {
        path: '/OrderItem/add',
        element: <AddOrderItem />,
    },
]

export default OrderItemRoutes
