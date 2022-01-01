import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: [true, 'Please enter a message']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});


export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema)