import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const usePasswordSelector= ()=>{
    const password= useSelector((state: RootState)=>state.signUp.passwordSignUp);
    return password;
}