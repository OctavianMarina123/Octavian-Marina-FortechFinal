import React from "react";
import {motion} from "framer-motion";
import {AppShell} from "@mantine/core";
import {MainHeader} from "../../components/MainHeader";
import {Auctions} from "./components/Auctions";

export const AuctionPage: React.FC = () => {
    return (
        <motion.div className="home-page"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
        >
            <AppShell header={<MainHeader/>}>
                <Auctions/>
            </AppShell>
        </motion.div>
    )
}