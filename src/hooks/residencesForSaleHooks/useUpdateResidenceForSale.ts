import {useMutation, useQueryClient} from "@tanstack/react-query";
import { putResidence,postResidence} from "../../service/placesForSaleService";



export const useUpdateResidence = ()=>{
    const queryClient= useQueryClient();
    return useMutation(postResidence,{
        onSuccess: ()=>{
            queryClient.invalidateQueries(['residences']);
        }
    })
}