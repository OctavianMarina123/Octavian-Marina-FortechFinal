import React, {useState} from "react";
import {Button, Center, Loader, TextInput} from "@mantine/core";
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {IPlaceForSaleSend} from "../../../types/IPlaceForSaleSend";
import {useUpdateResidence} from '../../../hooks/residencesForSaleHooks/useUpdateResidenceForSale'
import {useForm} from "@mantine/form";
import {showNotification} from "@mantine/notifications";

export const Update = (props: IPlaceForSaleSend) => {
    const user = useAccountSelector();
    const {isLoading, mutate: updateResidence, data} = useUpdateResidence();
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            title: '',
            add: '',
            prc:'',
            sm:'',
            descript:'',
            phoneNum:'',
        },

        validate: {
            title: (value) => (value.length>3 ? null : 'Title too short'),
            add: (value) => (value.length>1 ? null : 'Adress too short'),
            prc: (value)=>(!/[a-zA-Z]/g.test(value)?null : 'Price should be a number'),
            sm: (value)=>(!/[a-zA-Z]/g.test(value)?null : 'Value should be a number'),
            descript:(value)=>(value.length>1?null : 'Description too short'),
            phoneNum:(value)=>(!/[a-zA-Z]/g.test(value)?null:'Phone number invalid'),
        },
    });

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

    const onSubmit = () => {
        if (form.isValid() && form.isTouched()) {
            const priceNumber = Number(form.values['prc']);
            const sqmNumber = Number(form.values['sm']);
            let myuuid = props.id;
            updateResidence(
                {
                    id: myuuid,
                    address: form.values['add'],
                    name: form.values['title'],
                    price: priceNumber,
                    description: form.values['descript'],
                    userProfileImageLink: "...",
                    username: user,
                    sqm: sqmNumber,
                    phoneNumber: form.values['phoneNum'],
                },
                {
                    onSuccess: () => {
                        console.log("succes")
                        showNotification({
                            title: 'Congratulations!',
                            message: 'The ad has been successfully updated!',
                            styles: (theme) => ({
                                root: {
                                    backgroundColor: theme.colors.blue[6],
                                    borderColor: theme.colors.blue[6],

                                    '&::before': {backgroundColor: theme.white},
                                },

                                title: {color: theme.white},
                                description: {color: theme.white},
                                closeButton: {
                                    color: theme.white,
                                    '&:hover': {backgroundColor: theme.colors.blue[7]},
                                },
                            }),
                        })
                    }
                    ,
                    onError: (err) => {
                        console.log(err + "error")
                    }
                }
            )
        }
    }

    return (
        <>
            <TextInput
                {...form.getInputProps('title')}
                withAsterisk
                label="Title"
                placeholder="Place your title"
            />
            <TextInput
                {...form.getInputProps('add')}
                withAsterisk
                label="Address"
                placeholder="Address"
            />
            <TextInput
                {...form.getInputProps('prc')}
                withAsterisk
                label="Price"
                placeholder="Your price in euro"
            />
            <TextInput
                {...form.getInputProps('sm')}
                withAsterisk
                label="Square metres"
                placeholder="Square metre"
            />
            <TextInput
                {...form.getInputProps('descript')}
                withAsterisk
                label="Description"
                placeholder="Your description"
            />
            <TextInput
                {...form.getInputProps('phoneNum')}
                withAsterisk
                label="Phone number"
                placeholder="Your phone number"
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