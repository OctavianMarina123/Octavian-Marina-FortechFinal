import React, {useState} from "react";
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {Alert, Button, Center, Grid, Group, Loader, Modal} from "@mantine/core";
import {AuctionCard} from "./AuctionCard";
import {useAuctions} from "../../../hooks/auctionsHooks/useAuctions";
import {Add} from "./Add";
import {IAuctions} from "../../../types/IAuctions";

export const Auctions: React.FC = () => {
    const user = useAccountSelector();
    const {isLoading, isError, data: places} = useAuctions();
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
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Add/>
            </Modal>

            <Group position="center">
                {
                    user !== '' ?
                        <Button size="xl"
                                sx={{
                                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                    margin: "30px",
                                    fontSize: "26px",
                                    backgroundColor: "#ffb199",
                                    '&:hover': {backgroundColor: "#ff9d80", fontSize: "30px"},
                                }} onClick={() => setOpened(true)}>Add </Button>
                        : null
                }
            </Group>

            <Grid gutter="xl" justify="start">
                {
                    places?.map((place: IAuctions) =>
                        <Grid.Col sm={6} md={4} key={place.id}>
                            <AuctionCard auction={place}/>
                        </Grid.Col>
                    )
                }
            </Grid>

        </>
    )
}