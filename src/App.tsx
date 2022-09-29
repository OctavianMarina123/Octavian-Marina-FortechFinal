import React from 'react';
import {LoginPage} from "./page/login/LoginPage";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const App: React.FC = () => {
    return (
        <>
            <LoginPage/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </>
    );
}


