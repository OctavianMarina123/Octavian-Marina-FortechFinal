import {Header, Text, useMantineTheme,Image} from '@mantine/core';
import React from "react";
import {Link} from "react-router-dom";
import {useAccountSelector} from "../hooks/accountHooks/useAccountSelector";

export const MainHeader: React.FC = () => {
//"#77A6F7"
    const user=useAccountSelector();
    const theme = useMantineTheme();
    return (
        <Header sx={{
            background: theme.fn.linearGradient(0, '#77a6f7', '#4577cc')
        }} height={100} p="xs" styles={(theme) => ({
            main: {backgroundColor: theme.colors.dark[8]},
        })}>
            <div style={{display: 'flex', alignItems: 'center', height: '100%',justifyContent:'space-between',padding:'0px 60px 0px 60px'}}>
                <Image height={62} width={270} src='logo.png'   alt="logo" className="" style={{cursor:"pointer"}}/>
                {user!==''?
                <Text size="xl" color="white" style={{fontSize: "26px" ,padding:"5px"}}>
                    Welcome, { user}!
                </Text>
                    :
                    <Text color="white" style={{fontSize: "22px" ,padding:"0px"}}>
                        Anonymous mode
                    </Text>
                }
                <nav>
                    <Text component={Link} to="/home" size="xl" color="white" style={{fontSize: "26px" ,padding:"40px"}}>
                        HOME
                    </Text>

                    <Text component={Link} to="/login" size="xl" color="white"  style={{ fontSize:"26px",padding:"40px" }} >
                        LOG OUT
                    </Text>
                </nav>
            </div>
        </Header>
    )
}