const mongoose = require('mongoose')

const landingSchema = new mongoose.Schema({
    queryName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.Landing || mongoose.model('Landing', landingSchema)