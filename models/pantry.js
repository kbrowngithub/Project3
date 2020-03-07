const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pantrySchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: String }
});

const Pantry = mongoose.model("Pantry", pantrySchema);

module.exports = Pantry;