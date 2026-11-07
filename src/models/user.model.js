const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        default:"CUSTOMER"
    },
    mobile: {
        type: String,
    },
    address: [{
        //foreign key
        type: mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    paymetInformation: [
        {
            type:
                mongoose.Schema.TypesObjectId,
            //table should be created
            ref:"payment_information"
        }
    ],
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            //table should be created
            ref:"ratings"
        }
    ],

    createdAt: {
        type: Data,
        default:Data.now()
    }

})


// table name -> users
const User = mongoose.model("users", userSchema);
module.exports = User;
