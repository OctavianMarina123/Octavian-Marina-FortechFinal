import React, {useState} from "react";
import {IAuctions} from "../../../types/IAuctions";
import {AspectRatio, Button, Card, Center, Image, Loader, Modal, Text} from "@mantine/core"
import {AddressBook, Eye, Notification, Phone, ReportMoney, X} from 'tabler-icons-react';
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {useNavigate} from "react-router-dom";
import {useDeleteAuction} from "../../../hooks/auctionsHooks/useDeleteAuction";
import {Auction} from "./Auction";

interface AuctionCardProps {
    auction: IAuctions;
}

export const AuctionCard = ({auction}: AuctionCardProps) => {
    const user = useAccountSelector();
    const {isLoading, mutate: deleteAuction} = useDeleteAuction();
    const navigate = useNavigate();
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

    const handleClick = () => {
        navigate(`${auction.id}`, {});
    }

    const handleDelete = () => {
        deleteAuction(
            {
                id: auction.id,
                address: auction.address,
                title: auction.title,
                basePrice: auction.basePrice,
                description: auction.description,
                userProfileImageLink: auction.userProfileImageLink,
                username: auction.description,
                sqm: auction.sqm,
                phoneNumber: auction.phoneNumber,
            }
        )
    }

    return (
        <Card
            shadow="sm"
            p="lg"
            style={{
                minHeight: 700,
                maxHeight: 700,
                backgroundColor: "#77A6F7",
                padding: "60px 60px 40px 60px",
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
                {auction.username === user ?
                    <div style={{textAlign: "center"}}>
                        <Button onClick={handleDelete} color="red"
                                sx={{position: "absolute", right: "10px", top: "10px"}}>
                            <X/>
                        </Button>
                    </div>
                    : null}
                <Text
                    sx={{
                        fontSize: "32px",
                    }}
                    align="center"
                    size="xl" weight={700} color="WHITE">
                    {auction.title}
                </Text>
                <Text underline align="center" size="xl" weight={700} color="#00887a">
                    {auction.basePrice} €
                </Text>
                <AspectRatio ratio={720 / 1080} sx={{marginTop: "-70px", maxWidth: 300}} mx="auto">
                    <Image radius="md" src={`http://localhost:8080/api/auction/${auction.id}/image/download`}></Image>
                </AspectRatio>
                <div style={{
                    marginTop: "-80px"
                }}>
                    <Text size="md" weight={700} color="white">
                        {<AddressBook/>}Address:{auction.address}
                    </Text>
                    <Text size="md" weight={700} color="white">
                        <Eye/>The last price was proposed by {auction.username}!
                    </Text>

                    <Text size="md" weight={700} color="white">
                        <Phone/>Phone:{auction.phoneNumber}
                    </Text>
                    <Button fullWidth variant="outline" onClick={handleClick} color="#77a6f7"
                            sx={{maxWidth: "100px", color: "white", margin: "15px 0px 0px 0px"}}>
                        <Notification/> Details
                    </Button>

                    <Modal
                        opened={opened}
                        onClose={() => setOpened(false)}
                        title="New Bid!"
                    >
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Auction title={auction.title} basePrice={auction.basePrice}
                                 description={auction.description} phoneNumber={auction.phoneNumber}
                                 sqm={auction.sqm} address={auction.address} id={auction.id}
                                 username={auction.username} userProfileImageLink={auction.userProfileImageLink}/>
                    </Modal>


                    {auction.username !== user && user !== '' ?
                        <Button onClick={() => setOpened(true)} sx={{
                            color: "white",
                            maxWidth: "",
                            backgroundColor: "#ffb199",
                            position: "absolute",
                            right: 10,
                            bottom: 22
                        }}>
                            <ReportMoney/> New bid
                        </Button>
                        : null
                    }
                </div>

            </Card.Section>
        </Card>
    )
}