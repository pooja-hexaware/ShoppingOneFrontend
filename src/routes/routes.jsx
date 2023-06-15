import NotFound from 'views/sessions/NotFound'
import ReceiverRoutes from 'views/Receiver/ReceiverRoutes'
import SenderRoutes from 'views/Sender/SenderRoutes'
import MessageRoutes from 'views/Message/MessageRoutes'
import ReviewRoutes from 'views/Review/ReviewRoutes'
import OrderItemRoutes from 'views/OrderItem/OrderItemRoutes'
import OrderRoutes from 'views/Order/OrderRoutes'
import ProductRoutes from 'views/Product/ProductRoutes'
import CategoryRoutes from 'views/Category/CategoryRoutes'
import CommentRoutes from 'views/Comment/CommentRoutes'
import PostRoutes from 'views/Post/PostRoutes'
import UserRoutes from 'views/User/UserRoutes'
import sessionRoutes from 'views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import homeRoutes from 'views/home/HomeRoutes'
import { Navigate } from 'react-router-dom'
export const AllPages = () => {
    const all_routes = [
        {
            element: <MatxLayout />,
            children: [
                ...homeRoutes,
                ...UserRoutes,
                ...PostRoutes,
                ...CommentRoutes,
                ...CategoryRoutes,
                ...ProductRoutes,
                ...OrderRoutes,
                ...OrderItemRoutes,
                ...ReviewRoutes,
                ...MessageRoutes,
                ...SenderRoutes,
                ...ReceiverRoutes,
            ],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="home" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]
    return all_routes
}
