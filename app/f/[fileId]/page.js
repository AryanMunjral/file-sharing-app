"use client"
import React, { useEffect, useState } from 'react'
import { app } from '../../../firebaseConfig';
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import FileItem from './_components/FileItem';
// import { useSearchParams } from 'next/navigation';




function FileView({ params }) {
  const db = getFirestore(app);
  const [file, setFile] = useState();
  useEffect(() => {
    //console.log(params.fileId);

    params?.fileId && getFileInfo();
  }, [])

  // const searchParams = useSearchParams()

  // const downloadURL = searchParams.get('URL')
  // console.log(downloadURL);


  const getFileInfo = async () => {
    const docRef = doc(db, "uploadedFile", params?.fileId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  return (
    <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
      <FileItem file={file} />
    </div>
  )
}

export default FileView

// import React, { useEffect, useState } from 'react'
// import { app } from '../../../firebaseConfig';
// import { doc, getDoc, getFirestore } from 'firebase/firestore';
// import FileItem from './_components/FileItem'

// function FileView({ params }) {
//   const db = getFirestore(app);
//   const [file, setFile] = useState();
//   useEffect(() => {
//     // console.log(params);
//     params.fileId && getFileInfo()
//   }, [])
//   const getFileInfo = async () => {
//     const docRef = doc(db, "uploadedFile", params?.fileId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//       setFile(docSnap.data());
//     } else {
//       console.log("No such document!");
//     }
//   }
//   return (
//     <div className='bg-gray-100 h-screen w-full flex justify-center items-center flex-col gap-4'>
//       <FileItem />
//     </div>
//   )
// }

// export default FileView
