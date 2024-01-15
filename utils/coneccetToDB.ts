const mongoose = require("mongoose")

export const connecctToDB = () => {
    if(mongoose.connections[0].readyState){
        return false
    }

    mongoose.connect("mongodb+srv://bahaminwp:bahamin1364@bahamincluster.zht7zml.mongodb.net/myProject")
    
}