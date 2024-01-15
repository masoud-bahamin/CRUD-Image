const validator = require("fastest-validator") 

const v = new validator()

export const registerValidation = v.compile({
    username : {type : "string" , min: 5 , max : 50},
    email : {type : "string" , min: 5 , max : 50},
    password : {type : "string" , min: 5 , max : 50},
})