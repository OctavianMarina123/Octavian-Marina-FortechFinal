import React, {useState} from "react";
import {Alert, Button, Center, Grid, Group, Loader, Modal} from '@mantine/core';
import {useResidencesForSaleHook} from "../../../hooks/residencesForSaleHooks/useResidencesForSaleHook";
import {IPlaceForSale} from "../../../types/IPlaceForSale";
import {ResidencesForSaleCard} from "./ResidenceForSaleCard";
import {Sell} from "./Sell";
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";

export const ResidencesForSale: React.FC = () => {
    const user = useAccountSelector();
    const {isLoading, isError, data: places} = useResidencesForSaleHook();
    const [opened, setOpened] = useState(false);
    if (isError)
        return (
            <Alert title="Sorry!" color="red">
                Error loading data
            </Alert>
        )
    if (isLoading)
        return (
            <Center sx={{
                position: "absolute",
                left: 800,
                top: 400,
            }}>
                <Loader/>
            </Center>
        )

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Enter your details here!"
            >
                <Sell/>
            </Modal>
            <Group position="center">
                {
                    user !== '' ?
                        <Button size="xl"
                                sx={{
                                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                    margin: "30px",
                                    fontSize: "26px",
                                    backgroundColor: "#00887A",
                                    '&:hover': {backgroundColor: "#00665c", fontSize: "30px"},
                                }} onClick={() => setOpened(true)}>Sell </Button>
                        : null
                }
            </Group>
            <Grid gutter="xl" justify="start">
                {
                    places?.map((place: IPlaceForSale) =>
                        <Grid.Col sm={6} md={4} key={place.id}>
                            <ResidencesForSaleCard placeForSale={place}/>
                        </Grid.Col>
                    )
                }
            </Grid>
        </>
    )
}