import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const useFileSelector= ()=>{
    const file= useSelector((state: RootState)=>state.file.acceptedFiles);
    return file;
}