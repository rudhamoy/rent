const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name'],
        trim: true,
        maxLength: [100, 'Room name cannot exceed 100 characters']
    },
    pricePerMonth: {
        type: Number,
        required: [true, 'Please enter room price per month'],
        maxLength: [5, 'Price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter a small description']
    },
    address: {
        type: String,
        required: [true, 'Please enter room address']
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    roomCategory: {
        type: String,
        required: [true, 'Please enter room category'],
        enum: {
            values: ["1R", "1RK", "1BHK", "2BHK", "3BHK"]
        }
    },
    bathroomType: {
        type: String,
        required: [true, 'Please select bathroom type'],
        enum: {
            values: ["Attached", "Shared"]
        }
    },
    tenants: {
        type: String,
        required: [true, 'Please enter prefered tenants'],
        enum: {
            values: ["All", "Students", "Family", "Girls", "Boys", "Bachelor",]
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema)