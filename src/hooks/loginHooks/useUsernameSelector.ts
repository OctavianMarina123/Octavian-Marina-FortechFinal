import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const useUsernameSelector= ()=>{
    const username= useSelector((state: RootState)=>state.login.username);
    return username;
}