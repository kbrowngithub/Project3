const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pantrySchema = new Schema({
    name: { 
        type: String, 
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    quantity: { 
        type: Number, 
        required: true,
        minlength: 1,
        maxlength: 4
    },
    unit: {
        type: String,
        trim: true,
        maxlength: 10
    }
});

const Pantry = mongoose.model("Pantry", pantrySchema);

module.exports = Pantry; 