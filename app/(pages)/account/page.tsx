"use client";

import { useEffect, useState, useRef } from "react";
import type { PutBlobResult } from "@vercel/blob";

function Account() {
  const [image, setImage] = useState<null | File>(null);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    _id: string;
    image: any;
  }>();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  console.log(blob);

  const getMe = async () => {
    const res = await fetch("http://localhost:3000/api/auth/me");
    const data = (await res.json()) as {
      user: { email: string; _id: string; image: any };
    };
    console.log(data);

    setUserInfo(data.user);
  };

  useEffect(() => {
    getMe();
  }, []);

  // const saveImage = async () => {
  //     if (!image || !userInfo) {
  //         return false
  //     }

  //     const formData = new FormData()
  //     formData.append("image", image);
  //     formData.append("userId", userInfo._id);

  //     const res = await fetch("http://localhost:3000/api/img/create", {
  //         method: "POST",
  //         body: formData
  //     })
  //     if (res.ok) {
  //         getMe()
  //     }
  //     console.log(res);

  // }

  return (
    <div className="p-10 bg-green-100">
      Account page{" "}
      <p className="p-4 bg-rose-100"> {userInfo?.email || "plaese login"}</p>
      <div className="m-10">
        <img
          className="w-40 h-40"
          src={`${userInfo?.image[userInfo.image.length - 1]?.name}`}
          alt=""
        />
      </div>
      {/* <div className="m-10">
                <input type="file" onChange={e => {
                    const file = e.target?.files && e.target.files[0]
                    setImage(file || null)
                }} />
                <button className="bg-green-200 p-2" onClick={saveImage}>save</button>
            </div> */}
      <>
        <h1>Upload Your Avatar</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            if (!inputFileRef.current?.files) {
              throw new Error("No file selected");
            }

            const file = inputFileRef.current.files[0];

            const response = await fetch(
              `/api/file/${file.name}/${userInfo?._id}`,
              {
                method: "POST",
                body: file,
              }
            );

            const newBlob = (await response.json()) as PutBlobResult;

            setBlob(newBlob);
            getMe();
          }}
        >
          <input name="file" ref={inputFileRef} type="file" required />
          <button type="submit">Upload</button>
        </form>
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
            <br />
            <img src={blob.url} alt="" />
          </div>
        )}
      </>
    </div>
  );
}

export default Account;
