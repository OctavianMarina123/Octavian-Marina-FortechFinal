import {useCallback} from "react";
import {postResidence} from "../../service/placesForSaleService";
import {PlacePagination} from "../../types/PlacePagination";
import {useMutation, useQueryClient} from "@tanstack/react-query";

function delay(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
}
export const useCreateResidence = ()=>{
    const queryClient= useQueryClient();
    return useMutation(postResidence,{
        onSuccess: ()=>{
            delay(4000).then(() =>queryClient.invalidateQueries(['residences']));
        }
    })
}