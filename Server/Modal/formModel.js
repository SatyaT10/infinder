const mongoose = require('mongoose');

const Schema = mongoose.Schema

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    clinicName: {
        type: String,

    },
    mobileNo: {
        type: String,
        required: true
    },
    website: {
        type: String

    },
    isNewsletter: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Visiter', formSchema);