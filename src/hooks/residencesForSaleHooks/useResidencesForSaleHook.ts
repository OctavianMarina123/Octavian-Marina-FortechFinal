import {useQuery} from "@tanstack/react-query";
import {getPlaces} from "../../service/placesForSaleService";

export const useResidencesForSaleHook=()=>{
    return useQuery(['residences'],getPlaces);
}