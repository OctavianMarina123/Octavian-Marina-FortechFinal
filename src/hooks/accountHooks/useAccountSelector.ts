import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const useAccountSelector= ()=>{
    const account= useSelector((state: RootState)=>state.account.account);
    return account;
}