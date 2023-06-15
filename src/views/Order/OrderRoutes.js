import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const OrderList = Loadable(lazy(() => import('./OrderList')))
const EditOrder = Loadable(lazy(() => import('./EditOrder')))
const AddOrder = Loadable(lazy(() => import('./AddOrder')))

const OrderRoutes = [
    {
        path: '/Order',
        element: <OrderList />,
    },
    {
        path: '/Order/edit/:id',
        element: <EditOrder />,
    },
    {
        path: '/Order/add',
        element: <AddOrder />,
    },
]

export default OrderRoutes
