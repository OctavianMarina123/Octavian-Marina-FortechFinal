import React from "react";
import {AppShell} from "@mantine/core";
import {MainHeader} from "../../components/MainHeader";
import {motion} from "framer-motion";
import {ResidencesForSale} from "./components/ResidencesForSale";

export const SalePage: React.FC = () => {
    return (
        <motion.div className="home-page"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
        >
            <AppShell header={<MainHeader/>}>
                <ResidencesForSale/>
            </AppShell>
        </motion.div>
    )
}