import  {hash , compare} from "bcryptjs";

export const hashPassword = async (pass : string) => {
    const hashedPass = await hash(pass , 12);
    return hashedPass
}

export const comparePassword = async (pass : string , hash : string) => {
    const verifyPass = compare(pass , hash);
    return verifyPass
}