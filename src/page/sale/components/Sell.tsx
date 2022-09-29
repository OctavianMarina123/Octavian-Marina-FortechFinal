import React from "react";
import {Center, Loader, TextInput} from "@mantine/core";
import {useCreateResidence} from "../../../hooks/residencesForSaleHooks/useCreateResidence";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import {useDropzone} from "react-dropzone";
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {useForm} from '@mantine/form';
import {showNotification} from "@mantine/notifications";

export const Sell: React.FC = () => {
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {
            title: '',
            add: '',
            prc: '',
            sm: '',
            descript: '',
            phoneNum: '',
        },

        validate: {
            title: (value) => (value.length > 3 ? null : 'Title too short'),
            add: (value) => (value.length > 1 ? null : 'Adress too short'),
            prc: (value) => (!/[a-zA-Z]/g.test(value) ? null : 'Price should be a number'),
            sm: (value) => (!/[a-zA-Z]/g.test(value) ? null : 'Value should be a number'),
            descript: (value) => (value.length > 1 ? null : 'Description too short'),
            phoneNum: (value) => (!/[a-zA-Z]/g.test(value) ? null : 'Phone number invalid'),
        },
    });
    const user = useAccountSelector();
    const {isLoading, mutate: createResidence, data} = useCreateResidence();
    const onDrop = (acceptedFiles: any[]) => {
        if (form.isValid() && form.isTouched()) {
            const priceNumber = Number(form.values['prc']);
            const sqmNumber = Number(form.values['sm']);
            let myuuid = uuidv4().toString();
            createResidence(
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
                            message: 'The ad has been successfully added!',
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
            const file = acceptedFiles[0];
            console.log(file);
            const formData = new FormData();
            formData.append("file", file);
            axios.post(`http://localhost:8080/api/residence/${myuuid}/image/upload`,
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(() => {
                console.log("file upload")
            }).catch(() => {
                console.log("error");
            })
        } else {
            showNotification({
                title: 'Error:(',
                message: 'Invalid form...',
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
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
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


            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the photo here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </>
    )
}