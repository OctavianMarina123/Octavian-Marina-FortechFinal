import React, {useState} from "react";
import {IPlaceForSale} from "../../../types/IPlaceForSale";
import {AspectRatio, Button, Card, Center, Image, Loader, Modal, Text} from "@mantine/core"
import {AddressBook, Notification, Phone, UserCircle, X} from 'tabler-icons-react';
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {useDeleteResidence} from "../../../hooks/residencesForSaleHooks/useDeleteResidence";
import {Update} from "./Update";
import {useNavigate} from "react-router-dom";

interface ResidenceForSaleCardProps {
    placeForSale: IPlaceForSale;
}

export const ResidencesForSaleCard = ({placeForSale}: ResidenceForSaleCardProps) => {
    const user = useAccountSelector();
    const {isLoading, mutate: deleteResidence} = useDeleteResidence();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${placeForSale.id}`, {});
    }
    const handleDelete = () => {
        deleteResidence(
            {
                id: placeForSale.id,
                address: placeForSale.address,
                name: placeForSale.name,
                price: placeForSale.price,
                description: placeForSale.description,
                userProfileImageLink: placeForSale.user_profile_image_link,
                username: placeForSale.description,
                sqm: placeForSale.sqm,
                phoneNumber: placeForSale.phoneNumber,
            }
        )
    }
    const [opened, setOpened] = useState(false);
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
        <Card
            shadow="sm"
            p="lg"
            style={{
                minHeight: 560,
                maxHeight: 560,
                backgroundColor: "#00887a",
                padding: "60px",
                margin: "40px",
            }}
            radius="md"
            withBorder sx={{
            '&:hover': {
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px," +
                    " rgba(0, 0, 0, 0.12) 0px -12px 30px," +
                    " rgba(0, 0, 0, 0.12) 0px 4px 6px," +
                    " rgba(0, 0, 0, 0.17) 0px 12px 13px," +
                    " rgba(0, 0, 0, 0.09) 0px -3px 5px;"
            }
        }}>
            <Card.Section>
                {placeForSale.username === user ?
                    <div style={{textAlign: "center"}}>
                        <Button onClick={handleDelete} color="red"
                                sx={{position: "absolute", right: "10px", top: "10px"}}>
                            <X/>
                        </Button>


                        <Modal
                            opened={opened}
                            onClose={() => setOpened(false)}
                            title="Enter your details here!"
                        >
                            {/* eslint-disable-next-line react/jsx-no-undef */}
                            <Update name={placeForSale.name} price={placeForSale.price}
                                    description={placeForSale.description} phoneNumber={placeForSale.phoneNumber}
                                    sqm={placeForSale.sqm} address={placeForSale.address} id={placeForSale.id}
                                    username={placeForSale.username}
                                    userProfileImageLink={placeForSale.user_profile_image_link}/>
                        </Modal>


                        <Button onClick={() => setOpened(true)} color="#77a6f7"
                                sx={{position: "absolute", right: "10px", bottom: "10px"}}>
                            <Notification/> Update
                        </Button>

                    </div>
                    : null}
                <Text
                    align="center"
                    size="xl" weight={700} color="#77a6f7">
                    {placeForSale.name}
                </Text>
                <Text align="center" size="md" weight={700} color="#D3E3FC">
                    {placeForSale.price} €
                </Text>
                <AspectRatio ratio={720 / 1080} sx={{marginTop: "-70px", maxWidth: 300}} mx="auto">
                    <Image radius="md"
                           src={`http://localhost:8080/api/residence/${placeForSale.id}/image/download`}></Image>
                </AspectRatio>
                <div style={{
                    marginTop: "-110px"
                }}>
                    <Text size="md" weight={700} color="white">
                        {<AddressBook/>}Address:{placeForSale.address}
                    </Text>
                    <Text size="md" weight={700} color="white">
                        <UserCircle/>Owner:{placeForSale.username}
                    </Text>

                    <Text size="md" weight={700} color="white">
                        <Phone/>Phone:{placeForSale.phoneNumber}
                    </Text>
                    <Button fullWidth variant="outline" onClick={handleClick} color="#77a6f7"
                            sx={{maxWidth: "100px", color: "white"}}>
                        <Notification/> Details
                    </Button>
                </div>

            </Card.Section>
        </Card>
    )
}