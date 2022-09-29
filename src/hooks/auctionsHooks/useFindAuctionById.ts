import {useQuery} from "@tanstack/react-query";
import {getAuctionById} from "../../service/auctionsService";

export const useFindAuctionById = (id: string) => {
    return useQuery(['auctionById'], () => getAuctionById(id));
}