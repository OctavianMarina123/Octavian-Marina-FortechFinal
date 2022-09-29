import React from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import {App} from "../App";
import {AnimatePresence} from 'framer-motion'
import {HomePage} from "../page/home/HomePage";
import {SignUpPage} from "../page/signUp/SignUpPage";
import {LoginPage} from "../page/login/LoginPage";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {SalePage} from "../page/sale/SalePage";
import {SalePageDetails} from "../page/sale/SalePageDetails";
import {IPlaceForSaleSend} from "../types/IPlaceForSaleSend";
import {AuctionPage} from "../page/auction/AuctionPage";
import {AuctionPageDetails} from "../page/auction/AuctionPageDetails";
export const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<App/>}/>
                    <Route path="signUp" element={<SignUpPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="home" element={<HomePage/>}/>
                    <Route path="sale" element={<SalePage/>}/>
                    <Route path="auction" element={<AuctionPage/>}/>
                    <Route path="sale/:uuid" element={<SalePageDetails/>}/>
                    <Route path="auction/:uuid" element={<AuctionPageDetails/>}/>
                </Routes>
            </AnimatePresence>
        </QueryClientProvider>
    )
}
