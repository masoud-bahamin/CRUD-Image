import next from "next";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req : NextRequest){

    const token = req.cookies.get("token")?.value;

    if(!token){
       return NextResponse.redirect(new URL("/signup" , req.url))
       alert("plaese login")
    } 
    
}

export const config = {
    matcher : ["/account"]
}