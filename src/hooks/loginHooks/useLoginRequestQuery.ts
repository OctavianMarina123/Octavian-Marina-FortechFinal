import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {loginUser} from "../../service/userService";

export const useLoginRequest = ()=>{
    return useMutation(loginUser,
        {onSuccess:()=>{
            },onError:()=>{
            }}
        )
}