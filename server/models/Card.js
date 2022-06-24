const { Schema, model } = require("mongoose");

const Card = new Schema({
    CardNumber: {type: String, required: true},
    ExpDate: {type: String, required: true},
    Cvv: {type: String, required: true},
    Amount: {type: Number, required: true}
})

module.exports = model('Card', Card)