import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { FileRejection } from 'react-dropzone';
import axios from "axios";
import {useDispatch} from "react-redux";
import {useFileSelector} from "../hooks/fileHooks/useFileSelector";
import {setFile} from "../store/file/fileActionsCreators";

export const Dropzone: React.FC = () => {
    const dispatch= useDispatch();
    const f=useFileSelector();
    const setF=(acceptedFiles: any[])=>{
        dispatch(setFile(acceptedFiles))
    }
    const onDrop = useCallback((acceptedFiles: any[]) => {
        console.log(acceptedFiles[0])
       while(f[0] === null) {
           setF(acceptedFiles)
       }
        console.log(f[0])
/*
 const file=acceptedFiles[0];
        setF(file);
        console.log(file);
const formData= new FormData();
        formData.append("file",file);
        axios.post(`http://localhost:8080/api/residence/12/image/upload`,
            formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(()=>{
            console.log("file upload")
        }).catch(()=>{
            console.log("error");
        })*/
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}