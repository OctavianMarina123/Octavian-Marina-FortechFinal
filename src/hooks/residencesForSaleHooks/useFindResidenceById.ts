import {useQuery} from "@tanstack/react-query";
import {getPlacesById} from "../../service/placesForSaleService";

export const useFindResidenceById = (id: string) => {
    return useQuery(['residencesById'], () => getPlacesById(id));
}