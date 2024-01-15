import { sign, verify } from "jsonwebtoken"

export const tokenGenarate = (email: string) => {
    const token = sign({ email: email }, process.env.tokenPrivateKey || "masoud22")
    return token
}



export const verifyToken = (token: string) => {
    try {   
        const data  = verify(token, process.env.tokenPrivateKey || "masoud22");
        return data
    } catch (error) {
        return false
    }

}