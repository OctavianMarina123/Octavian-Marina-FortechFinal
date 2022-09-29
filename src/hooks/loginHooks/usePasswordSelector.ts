import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const usePasswordSelector= ()=>{
    const password= useSelector((state: RootState)=>state.login.password);
    return password;
}