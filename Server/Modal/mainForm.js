const mongoose = require('mongoose');



const mainSchema = new mongoose.Schema({
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
        required: true
    }
});


module.exports = mongoose.model('MainPage', mainSchema);
