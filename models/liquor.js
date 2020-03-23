const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liquorSchema = new Schema({
    // userEmail: {
    //     type: String,
    //     trime: true,
    //     required: true
    // },
    // liquors: [{
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength: 30
        }
    //}
//]
});

const Liquor = mongoose.model("Liquor", liquorSchema);

module.exports = Liquor;