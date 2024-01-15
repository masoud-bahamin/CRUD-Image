import { imageModel } from "@/models/imageModel";
import { connecctToDB } from "@/utils/coneccetToDB";
import { NextResponse } from "next/server";
const fs = require("fs")
const path = require("path")

export async function POST(req: any) {

    connecctToDB()

    const formData = await req.formData()
    const image = formData.get("image")
    const userId = formData.get("userId")

    if(!image){
        return NextResponse.json({ resulte: false , error : "image not found !!!!" }, { status: 400 })
    }

    const filename = Date.now() + image.name.replaceAll(" ", "_");

    try {
        const stream = fs.createWriteStream(`public/uploads/${filename}`)
        const bufferdImage = await image.arrayBuffer()
        stream.write(Buffer.from(bufferdImage), (error: any) => {
            if (error) {
                throw new Error(' saving image failed mas :((')
            }
        })

        const createImage = await imageModel.create({ name: filename , userId})

        return NextResponse.json({ resulte: true }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ resulte: false , error }, { status: 500 })
    }

}