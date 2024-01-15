import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({resulte : true} , {status : 200})
}