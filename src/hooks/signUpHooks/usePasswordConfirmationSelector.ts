import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const usePasswordConfirmationSelector= ()=>{
    const confirmPassword= useSelector((state: RootState)=>state.signUp.confirmPassword);
    return confirmPassword;
}