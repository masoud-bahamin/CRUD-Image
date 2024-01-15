import { userModel } from "@/models/userModel";
import { connecctToDB } from "@/utils/coneccetToDB";
import { verifyToken } from "@/utils/tokenGanarate";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        connecctToDB()

        const body = req.cookies.get("token")

        if(!body) {
            return NextResponse.json({ resulte: false, error: "token not found!!!" }, { status: 400 })
        }
        
        const myCookie  = verifyToken(body.value) as {email : string}

        if(!myCookie  ){
            return NextResponse.json({ resulte: false, error: "token invalid !!!" }, { status: 400 })
        }   

        const user = await userModel.findOne({ email : myCookie.email } , "-password -__v").populate("image").lean()

        if (!"user") {
            return NextResponse.json({ resulte: false, error: "username or email exist!!!" }, { status: 400 })
        }

        return NextResponse.json({ resulte: true, user }, { status: 200, })

    } catch (error) {
        return NextResponse.json({ resulte: false, error }, { status: 500 })
    }

}