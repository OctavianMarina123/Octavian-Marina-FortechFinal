import React from "react";
import {Alert, Button, Card, Center, Image, Loader, Text, useMantineTheme} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import {Notification} from "tabler-icons-react";
import {useNavigate} from "react-router-dom";
import {IPlaceForSale} from "../../../types/IPlaceForSale";
import {useResidencesForSaleHook} from "../../../hooks/residencesForSaleHooks/useResidencesForSaleHook";

export const SaleOptionCard: React.FC = () => {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    const {isLoading, isError, data: places} = useResidencesForSaleHook();
    const handleClick = () => {
        navigate('/sale', {});
    }
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
        <Card>
            <Card.Section sx={{
                marginRight: 190,
                height: 600,
                padding: 50,
                background: theme.fn.linearGradient(90, '#00887A', '#00887A'), cursor: "pointer",
            }}>
                <Text color="white" style={{
                    fontSize: "26px",
                    fontWeight: "bold"
                }}>
                    Places for sale
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
                          }}
                >
                    {
                        places?.map((place: IPlaceForSale) =>
                            <Carousel.Slide>
                                <Image width={416} height={312}
                                       src={`http://localhost:8080/api/residence/${place.id}/image/download`}/>
                            </Carousel.Slide>
                        )
                    }
                </Carousel>
                <Text color="white" sx={{marginTop: 40, fontSize: 18,}}>
                    Buy, sell and view properties all around the country!
                </Text>
                <Button onClick={handleClick} fullWidth variant="outline" color="#77a6f7"
                        sx={{maxWidth: "140px", color: "white", margin: "15px 0px 0px 0px"}}>
                    <Notification/> Find more
                </Button>
            </Card.Section>
        </Card>
    )
}