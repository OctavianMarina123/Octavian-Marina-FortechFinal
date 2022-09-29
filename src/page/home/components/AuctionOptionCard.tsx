import React from "react";
import {Alert, Button, Card, Center, Image, Loader, Text, useMantineTheme} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {IAuctions} from "../../../types/IAuctions";
import {Notification} from "tabler-icons-react";
import {useAuctions} from "../../../hooks/auctionsHooks/useAuctions";
import {useNavigate} from "react-router-dom";

export const AuctionOptionCard: React.FC = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const {isLoading: isLoadingAuc, isError: isErrorAuc, data: auctions} = useAuctions();
    const handleClickAuction = () => {
        navigate('/auction', {});
    }
    if (isErrorAuc)
        return (
            <Alert title="Sorry!" color="red">
                Error loading data
            </Alert>
        )

    if (isLoadingAuc)
        return (
            <Center sx={{
                position: "absolute",
                left: 400,
                top: 400,
            }}>
                <Loader/>
            </Center>
        )

    return (
        <Card radius="md">
            <Card.Section
                sx={{
                    marginRight: 180,
                    height: 600,
                    padding: 50,
                    background: theme.fn.linearGradient(90, '#77a6f7', '#4577cc'),
                    cursor: "pointer",
                }}>
                <Text className="home-text" color="white" style={{
                    fontSize: "26px",
                    fontWeight: "bold"
                }}>
                    Auction
                </Text>

                <Carousel sx={{maxWidth: 416}}
                          mx="auto"
                          height={312}
                          styles={{
                              control: {
                                  '&[data-inactive]': {
                                      opacity: 0,
                                      cursor: 'default',
                                  },
                              },
                          }}>
                    {
                        auctions?.map((auction: IAuctions) =>
                            <Carousel.Slide>
                                <Image width={416} height={312}
                                       src={`http://localhost:8080/api/auction/${auction.id}/image/download`}/>
                            </Carousel.Slide>
                        )
                    }
                </Carousel>
                <Text color="white" sx={{marginTop: 40, fontSize: 18,}}>
                    Find the right properties for you. Bid your offer now!
                </Text>
                <Button onClick={handleClickAuction} fullWidth variant="outline" color="#77a6f7"
                        sx={{maxWidth: "140px", color: "white", margin: "15px 0px 0px 0px"}}>
                    <Notification/> Find more
                </Button>
            </Card.Section>
        </Card>
    )
}