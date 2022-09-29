import React from "react";
import {Navbar, Text, useMantineTheme} from "@mantine/core";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAccountSelector} from "../hooks/accountHooks/useAccountSelector";

export const MainNavbar: React.FC = () => {
    const dispatch= useDispatch();
    const theme = useMantineTheme();
    return(<Navbar width={{ base: 250,
    }} sx={{
        marginTop:"-1px",
        background: theme.fn.linearGradient(180, '#77a6f7', '#4577cc')
    }}   p="xs">{
        <Text  size="xl" color="white" style={{fontSize: "42px" ,padding:"40px",marginTop:"100%"}}>
            Hello, {useAccountSelector()}!
        </Text>
    }</Navbar>)
}