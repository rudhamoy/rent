import Notification from '../models/notification'
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler'

// Create new Notification   =>   /api/notifications
const newNotification = catchAsyncErrors(async (req, res) => {

    const booking = await Notification.create(req.body)

    res.status(200).json({
        success: true,
        booking
    })

})

// Get notification of current user  =>   /api/notification/me
const myNotification = catchAsyncErrors(async (req, res) => {

    const notifications = await Notification.find({ user: req.user._id })

    const notificationCount = notifications.length

    res.status(200).json({
        success: true,
        notificationCount,
        notifications
    })
})

export { newNotification, myNotification }