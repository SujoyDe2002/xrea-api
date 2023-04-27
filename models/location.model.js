const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    geoId: {
        type: String,
        required: true,
    },
    geographicAreaName: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('location',locationSchema)