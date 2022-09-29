import React, {useState} from "react";
import {useForm} from '@mantine/form';
import {useDispatch} from 'react-redux';
import {Button, Center, Loader, PasswordInput, Switch, Text, TextInput, Title, useMantineTheme} from '@mantine/core';
import {useEventListener} from '@mantine/hooks';
import {Key, Login, User,} from 'tabler-icons-react';
import {Link, useNavigate} from "react-router-dom";
import {showNotification} from "@mantine/notifications";
import {motion} from "framer-motion";
import {useUsernameSelector} from "../../../hooks/loginHooks/useUsernameSelector";
import {usePasswordSelector} from "../../../hooks/loginHooks/usePasswordSelector";
import {setPassword, setUsername} from "../../../store/login/loginActionsCreators";
import {useLoginRequest} from "../../../hooks/loginHooks/useLoginRequestQuery";
import {setAccount} from "../../../store/account/accountActionsCreators";
import {IconCheck, IconX} from "@tabler/icons";

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const theme = useMantineTheme();
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const username = useUsernameSelector();
    const password = usePasswordSelector();
    const {isLoading, mutate: createUser, data} = useLoginRequest();
    const setAcc = (user: string) => {
        dispatch(setAccount(user));
    }
    const setUser = (user: string) => {
        dispatch(setUsername(user));
    };

    const setPass = (pass: string) => {
        dispatch(setPassword(pass));
    };
    const form = useForm({
        initialValues: {username: username, password: password},
        validate: {
            username: (value) => (value.length < 5 ? 'Name must have at least 5 letters'
                : value.indexOf(' ') >= 0 ? 'you cannot have spaces in the username'
                    : null),
            password: (value) => (value.length === 0 ? 'Password can\'t be empty' : null),

        },

    });
    const onLoginButtonClicked = () => {
        if (form.isValid()) {
            let u = form.values['username'];
            let p = form.values['password'];
            if (checked) {
                setUser(form.values['username']);
                setPass(form.values['password']);
            }
            else{
                setUser('');
                setPass('');
            }
            const user = {u, p};
            console.log(user);
            createUser(
                {
                    username: user.u,
                    password: user.p,
                },
                {
                    onSuccess: () => {
                        console.log("succes login");
                        showNotification({
                            title: 'Congratulations!',
                            message: 'You have successfully logged in!',
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
                        setAcc(form.values['username']);
                        navigate('/home');
                    },
                    onError: () => {
                        console.log("failed login");
                        showNotification({
                            title: 'Error:(',
                            message: 'username or password is incorrect...',
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
                    initial={{height: "500x"}}
                    animate={{height: "600px"}}
        >
            <div className="right-box">
                <img src='logo.PNG' alt="logo" className=""/>
            </div>
            <div className="left-box">
                <form onSubmit={form.onSubmit(console.log)}>
                    <div className="title">
                        <Title italic order={1} align="center" color="white">
                            Welcome back!
                            <br></br>
                            <br></br>
                            <Text size="md" color="white">Don't have an account?</Text>
                            <nav>
                                <Text sx={{
                                    '&:hover': {color:"#ffe0d6"},
                                }}underline color="#FFCCBC" component="a" size="md">
                                    <Link to="/signUp">Sign up Now!</Link>
                                </Text>
                            </nav>
                        </Title>
                        <Text sx={{
                            '&:hover': {color:"#ffe0d6"},
                        }}underline color="#FFCCBC" component="a" size="md">
                            <Link onClick={()=>{setAcc('')}} to="/home">Anonymous Login</Link>
                        </Text>
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
                        <PasswordInput
                            sx={{
                                maxWidth: 300,
                            }}
                            icon={<Key/>}
                            variant="filled"
                            placeholder="Password"
                            radius="lg"
                            size="md"
                            {...form.getInputProps('password')}
                        />
                    </div>
                    <Switch
                        sx={{
                            marginTop: 30,
                            marginLeft: 0,
                        }}
                        checked={checked}
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                        color="teal"
                        size="sm"
                        label="Remember me"
                        thumbIcon={
                            checked ? (
                                <IconCheck size={12} color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3}/>
                            ) : (
                                <IconX size={12} color={theme.colors.red[theme.fn.primaryShade()]} stroke={3}/>
                            )
                        }
                    />
                    <div className="button">
                        <Button onSubmit={() => {
                            onLoginButtonClicked()
                        }} type="submit" ref={ref} leftIcon={<Login/>} size="md"
                                styles={() => ({
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
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
