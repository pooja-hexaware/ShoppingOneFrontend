import { configureStore } from '@reduxjs/toolkit'
import ReceiverReducer from '../views/Receiver/store/ReceiverSlice'
import SenderReducer from '../views/Sender/store/SenderSlice'
import MessageReducer from '../views/Message/store/MessageSlice'
import ReviewReducer from '../views/Review/store/ReviewSlice'
import OrderItemReducer from '../views/OrderItem/store/OrderItemSlice'
import OrderReducer from '../views/Order/store/OrderSlice'
import ProductReducer from '../views/Product/store/ProductSlice'
import CategoryReducer from '../views/Category/store/CategorySlice'
import CommentReducer from '../views/Comment/store/CommentSlice'
import PostReducer from '../views/Post/store/PostSlice'
import UserReducer from '../views/User/store/UserSlice'
import { createLogger } from 'redux-logger'
import notificationReducer from '../middleware/notification/store/notificationSlice'
let middlewares = []
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    })
    middlewares.push(logger)
}
export default configureStore({
    reducer: {
        notification: notificationReducer,
        User: UserReducer,
        Post: PostReducer,
        Comment: CommentReducer,
        Category: CategoryReducer,
        Product: ProductReducer,
        Order: OrderReducer,
        OrderItem: OrderItemReducer,
        Review: ReviewReducer,
        Message: MessageReducer,
        Sender: SenderReducer,
        Receiver: ReceiverReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
    devTools: process.env.NODE_ENV !== 'production',
})
