import { userModel } from "@/models/userModel";
import { connecctToDB } from "@/utils/coneccetToDB";
import { hashPassword } from "@/utils/hashPassword";
import { tokenGenarate } from "@/utils/tokenGanarate";
import { registerValidation } from "@/validations/ApiValidations/user";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie"

export async function POST(req: NextRequest) {
    try {
        connecctToDB()

        const body = await req.json()

        const validation = registerValidation(body)

        if (validation !== true) {
            return NextResponse.json({ resulte: false, error: validation }, { status: 400 })
        }

        const { email, username, password } = body

        const oldUser = await userModel.findOne({ $or: [{ email: email }, { username: username }] })

        if (oldUser) {
            return NextResponse.json({ resulte: false, error: "username or email exist!!!" }, { status: 400 })
        }

        const hashPass = await hashPassword(password)

        const user = await userModel.create({ email, username, password: hashPass , role : "USER"})

        const token = tokenGenarate(email)

        const setCookie = cookie.serialize("token", token, {
            maxAge: 60 * 60 * 24 * 5,
            httpOnly: true,
            path : "/"
        })

        return NextResponse.json({ resulte: true, token, email }, {
            status: 201,
            headers: {
                "Set-Cookie": setCookie
            }
        })

    } catch (error) {
        return NextResponse.json({ resulte: false, error }, { status: 500 })
    }

}