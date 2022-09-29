import React from "react";
import {AppShell, Center, Image, Text, Card, useMantineTheme, Alert, Loader} from "@mantine/core";
import {HeaderComp} from "../../components/Header";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";
import {useFindResidenceById} from "../../hooks/residencesForSaleHooks/useFindResidenceById";
import {AddressBook, Article, CoinEuro, Phone, UserCircle,InfoSquare} from "tabler-icons-react";

export const SalePageDetails = () => {
    const theme = useMantineTheme();
    const {uuid} = useParams();
    const {isLoading, isError, data: places} = useFindResidenceById(uuid || "");

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
                    <Card shadow="sm" p="lg" radius="md" withBorder sx={{height:700,width:700,background: theme.fn.linearGradient(90, '#00887A', '#00887A'),cursor:"pointer"}} >
                        <Card.Section sx={{position:"absolute",bottom:330}}>
                <Center style={{width: 400, height: 150, alignItems: "center", marginTop: "5%", marginLeft: "35%"}}>
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
                                    places[0].name :
                                    null
                            }
                        </Text>
                        <Image radius="md" width={380}
                               src={`http://localhost:8080/api/residence/${places ? places[0].id : null}/image/download`}></Image>
                        <Text sx={{
                            margin: "20px 20px 20px 0px",
                        }} size="sm" weight={700} color="white">
                            <CoinEuro/> {
                            places ?
                                places[0].price :
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
                            <Text sx={{
                                margin: "20px 20px 20px 0px",
                            }} size="sm" weight={700} color="white">
                                <InfoSquare/> {
                                places ?
                                    places[0].sqm :
                                    null
                            } square meters
                            </Text>
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