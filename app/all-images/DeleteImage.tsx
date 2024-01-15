"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

function DeleteImage({url}: any) {

    const router = useRouter()

    const deleteHandler = async () => {
        const res = await fetch(`/api/file/${url}`,{
            method:"DELETE",
            body:JSON.stringify({url})
        })
        console.log("reeees", res);
        router.refresh()
    }
    return (
        <button
            onClick={deleteHandler}
            className='m-4 bg-rose-500 text-white p-3'
        >Delete</button>
    )
}

export default DeleteImage