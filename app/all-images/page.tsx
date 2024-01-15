import React from 'react'
import { list, del } from '@vercel/blob'
import DeleteImage from './DeleteImage'

async function Page() {

    const { blobs } = await list()



    return (
        <div className='p-8 flex flex-wrap gap-10'>
            {
                blobs.map(i => (
                    <div className='p-5 border ' key={i.url}>
                        <img src={i.url} className='w-40' alt="" />
                        <p>name : {i.pathname}</p>
                        <p>size :  {i.size}</p>
                        <p>{i.uploadedAt.toString().slice(0,25)}</p>
                        <DeleteImage  url={i.url}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Page