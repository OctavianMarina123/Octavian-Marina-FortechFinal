import React from "react";
import {Alert, AppShell, Card, Center, Image, Loader, Text, useMantineTheme} from "@mantine/core";
import {HeaderComp} from "../../components/Header";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import {AddressBook, Article, CoinEuro, InfoSquare, Phone, UserCircle} from "tabler-icons-react";
import {useFindAuctionById} from "../../hooks/auctionsHooks/useFindAuctionById";

export const AuctionPageDetails = () => {
    const theme = useMantineTheme();
    const {uuid} = useParams();
    const {isLoading, isError, data: places} = useFindAuctionById(uuid || "");
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
        <motion.div className="home-page"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
        >
            <AppShell header={<HeaderComp/>}>
                <Center>
                    <Card shadow="sm" p="lg" radius="md" withBorder sx={{
                        height: 700,
                        width: 700,
                        background: theme.fn.linearGradient(90, '#77a6f7', '#4577cc'),
                        cursor: "pointer"
                    }}>
                        <Card.Section sx={{position: "absolute", bottom: 330}}>
                            <Center style={{
                                width: 400,
                                height: 150,
                                alignItems: "center",
                                marginTop: "15%",
                                marginLeft: "35%"
                            }}>
                                <div>
                                    <Text
                                        align={"center"}
                                        sx={{
                                            margin: "100px 0px 20px 0px",
                                            fontSize: 28,
                                        }}
                                        size="xl" weight={700} color="white">
                                        {
                                            places ?
                                                places[0].title :
                                                null
                                        }
                                    </Text>
                                    <Image radius="sm" width={380}
                                           src={`http://localhost:8080/api/auction/${places ? places[0].id : null}/image/download`}></Image>
                                    <Text sx={{
                                        margin: "20px 20px 20px 0px",
                                    }} size="md" weight={700} color="white">
                                        <CoinEuro/> {
                                        places ?
                                            places[0].basePrice :
                                            null
                                    }
                                    </Text>
                                    <Text sx={{
                                        margin: "20px 20px 20px 0px",
                                    }} size="sm" weight={700} color="white">
                                        {<AddressBook/>}Address:{
                                        places ?
                                            places[0].address :
                                            null
                                    }
                                    </Text>
                                    <Text sx={{
                                        margin: "20px 20px 20px 0px",
                                    }} size="sm" weight={700} color="white">
                                        <UserCircle/>Owner:{
                                        places ?
                                            places[0].username :
                                            null
                                    }
                                    </Text>

                                    <Text sx={{
                                        margin: "20px 20px 20px 0px",
                                    }} size="sm" weight={700} color="white">
                                        <Phone/>Phone:{
                                        places ?
                                            places[0].phoneNumber :
                                            null
                                    }
                                    </Text>
                                    <Text sx={{
                                        margin: "20px 20px 20px 0px",
                                    }} size="sm" weight={700} color="white">
                                        <InfoSquare/> {
                                        places ?
                                            places[0].sqm :
                                            null
                                    } square meters
                                    </Text>
                                    <Text sx={{
                                        margin: "20px 20px 20px 0px",
                                    }} size="sm" weight={700} color="white">
                                        <Article/> {
                                        places ?
                                            places[0].description :
                                            null
                                    }
                                    </Text>

                                </div>
                            </Center>
                        </Card.Section>
                    </Card>
                </Center>
            </AppShell>
        </motion.div>
    )
}