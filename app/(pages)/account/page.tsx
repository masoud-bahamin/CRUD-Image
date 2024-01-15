"use client"

import { useEffect, useState } from "react"



function Account() {

    const [image, setImage] = useState<null | File>(null)
    const [userInfo , setUserInfo] = useState<{email : string , _id:string , image : any}>()

    const getMe = async () => {
        const res = await fetch("http://localhost:3000/api/auth/me")
        const data  = await res.json() as {user : {email : string, _id:string , image : any}}
        console.log(data);
        
        setUserInfo(data.user)
    }

    useEffect(() => {
        getMe()
    },[])

    const saveImage = async () => {
        if(!image || !userInfo){
            return false
        }

        const formData = new FormData()
        formData.append("image" , image);
        formData.append("userId" , userInfo._id);

        const res = await fetch("http://localhost:3000/api/img/create" , {
            method : "POST" ,
            body : formData
        })
        if(res.ok){
            getMe()
        }
        console.log(res);
        

    }

    return (
        <div>Account {userInfo?.email || "plaese login"}
        <div className="m-10">
            <img className="w-40 h-40"
            src={`/uploads/${userInfo?.image[userInfo.image.length -1]?.name}`} alt="" />
        </div>
            <div className="m-10">
                <input type="file" onChange={e => {
                    const file = e.target?.files && e.target.files[0]
                    setImage(file || null)
                }} />
                <button className="bg-green-200 p-2" onClick={saveImage}>save</button>
            </div>
        </div>
    )
}

export default Account