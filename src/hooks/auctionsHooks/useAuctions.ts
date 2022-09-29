import {useQuery} from "@tanstack/react-query";
import {getAuctions} from "../../service/auctionsService";

export const useAuctions = () => {
    return useQuery(['auctions'], getAuctions);
}