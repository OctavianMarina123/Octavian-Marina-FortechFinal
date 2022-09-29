import React, {useEffect} from "react";
import {showNotification} from '@mantine/notifications';
import {useForm} from '@mantine/form';
import {Button, Center, Loader, Text, TextInput, Title} from '@mantine/core';
import {useEventListener} from '@mantine/hooks';
import {CloudDataConnection, Key, User} from 'tabler-icons-react';
import '../../../components/signup.css';
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch} from "react-redux";
import {useUsernameSelector} from "../../../hooks/signUpHooks/useUsernameSelector";
import {usePasswordSelector} from "../../../hooks/signUpHooks/usePasswordSelector";
import {usePasswordConfirmationSelector} from "../../../hooks/signUpHooks/usePasswordConfirmationSelector";
import {setConfirmPassword, setPasswordSignUp, setUsernameSignUp} from "../../../store/signUp/signUpActionsCreators";
import {useSignUpRequest} from "../../../hooks/signUpHooks/useSignUpRequestQuery";

export const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const {isLoading, mutate: createUser, data} = useSignUpRequest();
    const username = useUsernameSelector();
    const password = usePasswordSelector();
    const passwordConfirmation = usePasswordConfirmationSelector();

    const setUser = (user: string) => {
        dispatch(setUsernameSignUp(user));
    };
    const setPass = (pass: string) => {
        dispatch(setPasswordSignUp(pass));
    };
    const setPassConf = (pass: string) => {
        dispatch(setConfirmPassword(pass));
    };
    const navigate = useNavigate();
    const form = useForm({
        validateInputOnChange: true,
        initialValues: {username: username, password: password, confirmPassword: passwordConfirmation},
        validate: {
            username: (value) => (value.length < 5 ? 'Name must have at least 5 letters'
                : value.indexOf(' ') >= 0 ? 'you cannot have spaces in the username' : null),
            password: (value) => (value.length < 5 ? 'Password too short!'
                : !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value) ? "you need at least one capital letter and one number" : null),
            confirmPassword: (value, values) => value !== values.password ? 'Passwords did not match' : null,
        },

    });
    useEffect(() => {
        setUser(form.values['username']);
        setPass(form.values['password']);
        setPassConf(form.values['confirmPassword']);
    }, [form.values['username'], form.values['password'], form.values['confirmPassword']]);

    const onLoginButtonClicked = () => {
        setUser(form.values['username']);
        setPass(form.values['password']);
        setPassConf(form.values['confirmPassword']);
        if (form.isValid()) {
            if (username !== '' && password !== '') {
                createUser(
                    {
                        username: username,
                        password: password
                    },
                    {
                        onSuccess: () => {
                            showNotification({
                                title: 'Congratulations!',
                                message: 'Your account has been created!',
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
                            navigate('/login');
                        },
                        onError: () => {
                            showNotification({
                                title: 'Error creating your account...',
                                message: 'Username already in use🤥',
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
                )
            } else {
                console.log("form not valid");

            }
        }
    }
    const ref = useEventListener('click', onLoginButtonClicked);

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

        <motion.div className="login-form"
                    initial={{height: "600px"}}
                    animate={{height: "700px"}}
        >
            <div className="right-box">
                <img src='logo.PNG' alt="logo" className="logo"/>
            </div>
            <div className="left-box">
                <form onSubmit={form.onSubmit(console.log)}>
                    <div className="title">
                        <Title italic order={1} align="center" color="white">
                            Sign UP!
                            <br></br>
                            <br></br>
                            <Text size="md" color="white">Already a member?</Text>
                            <nav>
                                <Text underline color="#FFCCBC" component="a" href="https://mantine.dev" size="md">
                                    <Link to="/login">Log in!</Link>
                                </Text>
                            </nav>
                        </Title>
                    </div>


                    <div className="mini-box">
                        <TextInput
                            icon={<User/>}
                            variant="filled"
                            placeholder="Username"
                            radius="lg"
                            size="md"
                            {...form.getInputProps('username')}
                        />
                    </div>

                    <div className="mini-box">
                        <TextInput
                            icon={<Key/>}
                            type="password"
                            variant="filled"
                            placeholder="Password"
                            radius="lg"
                            size="md"
                            {...form.getInputProps('password')}
                        />
                    </div>

                    <div className="mini-box">
                        <TextInput
                            icon={<Key/>}
                            type="password"
                            variant="filled"
                            placeholder="Confirm password"
                            radius="lg"
                            size="md"
                            {...form.getInputProps('confirmPassword')}
                        />
                    </div>
                    <div className="button">
                        <Button onSubmit={() => {
                            onLoginButtonClicked()

                        }} type="submit" ref={ref} leftIcon={<CloudDataConnection/>} size="md"
                                styles={(theme) => ({
                                    root: {
                                        backgroundColor: '#ffffff',
                                        color: 'black',
                                        border: 0,
                                        height: 42,
                                        paddingLeft: 20,
                                        paddingRight: 20,

                                        '&:hover': {
                                            backgroundColor: '#ededed',
                                        },
                                    },

                                    leftIcon: {
                                        marginRight: 15,
                                    },
                                })}>
                            Sign UP
                        </Button>
                    </div>
                </form>
            </div>

        </motion.div>

    );
}