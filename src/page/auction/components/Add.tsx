import React from "react";
import {Center, Loader, TextInput} from "@mantine/core";
import {ImageUploader} from "../../../components/ImageUploader";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import {useDropzone} from "react-dropzone";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAccountSelector} from "../../../hooks/accountHooks/useAccountSelector";
import {useCreateAuction} from "../../../hooks/auctionsHooks/useCreateAuction";
import {useForm} from '@mantine/form';
import {showNotification} from "@mantine/notifications";

export const Add: React.FC = () => {
    const user = useAccountSelector();
    const {isLoading, mutate: createAuction, data} = useCreateAuction();

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
    const onDrop = (acceptedFiles: any[]) => {
        if (form.isValid() && form.isTouched()) {
            const priceNumber = Number(form.values['prc']);
            const sqmNumber = Number(form.values['sm']);
            let myuuid = uuidv4().toString();
            console.log(myuuid);
            createAuction(
                {
                    id: myuuid,
                    address: form.values['add'],
                    title: form.values['title'],
                    basePrice: priceNumber,
                    description: form.values['descript'],
                    userProfileImageLink: "...",
                    username: user,
                    sqm: sqmNumber,
                    phoneNumber: form.values['phoneNum'],
                },
                {
                    onSuccess: () => {
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
            const formData = new FormData();
            formData.append("file", file);
            axios.post(`http://localhost:8080/api/auction/${myuuid}/image/upload`,
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(() => {
                console.log("file upload")
            }).catch(() => {
                console.log("error");
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
                label="Base price"
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
            <div>
                <ImageUploader/>

            </div>

            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </>
    )
}