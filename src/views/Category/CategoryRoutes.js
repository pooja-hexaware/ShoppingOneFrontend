import React, { lazy } from 'react'
import Loadable from 'components/Loadable/Loadable'

const CategoryList = Loadable(lazy(() => import('./CategoryList')))
const EditCategory = Loadable(lazy(() => import('./EditCategory')))
const AddCategory = Loadable(lazy(() => import('./AddCategory')))

const CategoryRoutes = [
    {
        path: '/Category',
        element: <CategoryList />,
    },
    {
        path: '/Category/edit/:id',
        element: <EditCategory />,
    },
    {
        path: '/Category/add',
        element: <AddCategory />,
    },
]

export default CategoryRoutes
