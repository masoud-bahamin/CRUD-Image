
const mongoose = require("mongoose")
const Image = require("@/models/imageModel")

const schema = mongoose.Schema({
    username : {
        type : String ,
        required : true,
        unique : true ,
    },
    email : {
        type : String ,
        required : true,
        unique : true,
    },
    password : {
        type : String ,
        required : true
    },
    role :{
        type : String,
        enum : ["ADMIN" , "DOCTOR" , "USER" , "STAFF"],
        default : "USER"
    }
} , {
    timestamps : true
})

schema.virtual("image" , {
    ref : "Image",
    localField : "_id" ,
    foreignField : "userId"
})

export const userModel = mongoose.models.User || mongoose.model("User" , schema)