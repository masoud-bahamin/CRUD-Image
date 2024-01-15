const mongoose = require("mongoose")
import { userModel } from "./userModel"

const schema = mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
} , {
    timestamps : true
})

export const imageModel = mongoose.models.Image || mongoose.model("Image" , schema)