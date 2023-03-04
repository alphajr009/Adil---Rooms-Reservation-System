const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email :{
        type: String, required: true
    },

    password:{
        type: String, required: true
    },
    isUser:{
        type: Boolean, default:false
    }

},{
    timestamps: true,
})

const sellerModel = mongoose.model('sellers',userSchema)

module.exports = sellerModel