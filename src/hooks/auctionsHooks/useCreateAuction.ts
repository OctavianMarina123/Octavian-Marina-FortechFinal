import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postAuction} from "../../service/auctionsService";

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const useCreateAuction = () => {
    const queryClient = useQueryClient();
    return useMutation(postAuction, {
        onSuccess: () => {
            delay(3500).then(() => queryClient.invalidateQueries(['auctions']));
        }
    })
}