import {useMutation} from "@tanstack/react-query";
import {loginUser, signUpUser} from "../../service/userService";

export const useSignUpRequest = ()=>{
    return useMutation(signUpUser,
        {onSuccess:()=>{
            },onError:()=>{

            }}
    )
}