import React, {useEffect} from "react";
import axios from "axios";
import {useResidencesForSaleHook} from "../hooks/residencesForSaleHooks/useResidencesForSaleHook";
import {IPlaceForSale} from "../types/IPlaceForSale";
import {Grid} from "@mantine/core";
import {ResidencesForSaleCard} from "../page/sale/components/ResidenceForSaleCard";



export const ImageUploader: React.FC = () => {
    const {isLoading, isError, data: places} = useResidencesForSaleHook();
    return(
        <>
            {
                places?.map((place: IPlaceForSale) =>
                    <>
                        {place.username}
                    </>
                )
            }
        </>
    )
}