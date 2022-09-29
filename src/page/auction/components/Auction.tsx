import React from "react";
import {Button, Center, Loader, TextInput} from "@mantine/core";
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {IAuctions} from "../../../types/IAuctions";
import {useUpdateAuctions} from "../../../hooks/auctionsHooks/useUpdateAuction";
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";

export const Auction = (props: IAuctions) => {
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            prc: '',
        },
        validate: {
            prc: (value) => (!/[a-zA-Z]/g.test(value) ? null : 'Price should be a number'),
        },
    });
    const user = useAccountSelector();
    const {isLoading, mutate: updateAuction, data} = useUpdateAuctions();

    const onSubmit = () => {
        console.log(form.values['prc']);
        if (form.isValid() && form.isTouched()) {
            const priceNumber = Number(form.values['prc']);
            if (priceNumber < props.basePrice + 0.2 * props.basePrice&&priceNumber>props.basePrice) {
                let myuuid = props.id;
                console.log("updating");
                updateAuction(
                    {
                        id: myuuid,
                        address: props.address,
                        title: props.title,
                        basePrice: priceNumber,
                        description: props.description,
                        userProfileImageLink: props.userProfileImageLink,
                        username: user,
                        sqm: props.sqm,
                        phoneNumber: props.phoneNumber,
                    },
                    {
                        onSuccess: () => {
                            console.log("succes")
                        }
                        ,
                        onError: (err) => {
                            console.log(err + "error")
                        }
                    }
                )
            }
            else if(priceNumber>props.basePrice){
                showNotification({
                    title: 'Price too high!',
                    message: '\n' +
                        'the price must be a maximum of 20% higher',
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[6],
                            borderColor: theme.colors.red[6],

                            '&::before': {backgroundColor: theme.white},
                        },

                        title: {color: theme.white},
                        description: {color: theme.white},
                        closeButton: {
                            color: theme.white,
                            '&:hover': {backgroundColor: theme.colors.red[7]},
                        },
                    }),
                })
            }
            else{
                showNotification({
                    title: 'Price too low!',
                    message: '\n' +
                        'the price can\'t be lower',
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[6],
                            borderColor: theme.colors.red[6],

                            '&::before': {backgroundColor: theme.white},
                        },

                        title: {color: theme.white},
                        description: {color: theme.white},
                        closeButton: {
                            color: theme.white,
                            '&:hover': {backgroundColor: theme.colors.red[7]},
                        },
                    }),
                })
            }
        }
    }
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
            <TextInput
                {...form.getInputProps('prc')}
                withAsterisk
                label="New bid"
                placeholder="Make an offer!(Max 20% more)"
            />
            <Button onClick={onSubmit} size="xl"
                    sx={{
                        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        margin: "30px",
                        fontSize: "26px",
                        backgroundColor: "#00887A",
                        '&:hover': {backgroundColor: "#00665c", fontSize: "30px"},
                    }}>
                Submit
            </Button>
        </>
    )
}