import {useMutation, useQueryClient} from "@tanstack/react-query";
import {postAuction} from "../../service/auctionsService";

export const useUpdateAuctions = () => {
    const queryClient = useQueryClient();
    return useMutation(postAuction, {
        onSuccess: () => {
            queryClient.invalidateQueries(['auctions']);
        }
    })
}