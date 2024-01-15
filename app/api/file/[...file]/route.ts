import { imageModel } from '@/models/imageModel';
import { connecctToDB } from '@/utils/coneccetToDB';
import { put , del} from '@vercel/blob';
import { NextResponse } from 'next/server';
import { Context } from 'vm';

export async function DELETE(request: Request ): Promise<NextResponse> {
    const body : {url : string}  = await request.json()

    console.log( "oooooooo" ,body.url);
    
         await del(body.url);

        connecctToDB()

        const createImage = await imageModel.findOneAndDelete({ name : body.url })


        return NextResponse.json({Result : true});

}



export async function POST(request: Request , context : Context): Promise<NextResponse> {
    const params :  string[]  = context.params.file 
    console.log( "oooooooo" ,params);
    

    if (request.body ) {

        const blob = await put(params[0], request.body, {
            access: 'public',
        });

        connecctToDB()
        
        const userId = "65a28cad5bb94409be665a17"

        const createImage = await imageModel.create({ name: blob.url,userId : params[1] })


        return NextResponse.json(blob);

    } else {
        return NextResponse.json({ message: "file not found" });
    }
}






// The next lines are required for Pages API Routes only
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
