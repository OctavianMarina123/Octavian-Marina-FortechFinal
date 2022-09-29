import React from "react";
import {AppShell, Text} from '@mantine/core';
import {MainHeader} from "../../components/MainHeader";
import {motion} from "framer-motion";
import {AuctionOptionCard} from "./components/AuctionOptionCard";
import {SaleOptionCard} from "./components/SaleOptionCard";

export const HomePage: React.FC = () => {
    return (
        <motion.div className="home-page"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
        >
            <AppShell header={<MainHeader/>}>
                <Text color="#00887A" style={{
                    marginTop: "5%",
                    marginLeft: "190px",
                    fontSize: "26px",
                    fontWeight: "bold"
                }}>Categories:</Text>
                <div className="Container"
                     style={{marginLeft: '190px', marginTop: '1%', display: "flex", alignItems: "center"}}>
                    <AuctionOptionCard/>
                    <SaleOptionCard/>
                </div>
            </AppShell>
        </motion.div>

    )
}