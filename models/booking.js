import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    readyToMove: {
        type: Boolean,
        default: false
    },
    numTenants: {
        type: Number,
        required: [true, 'Please specify number of tenants']
    },
    // paymentInfo: {
    //     id: {
    //         type: String,
    //         required: true
    //     },
    //     status: {
    //         type: String,
    //         required: true
    //     }
    // },
    // paidAt: {
    //     type: Date,
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema)