import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {NotificationsProvider} from '@mantine/notifications';
import {MantineProvider} from '@mantine/core'
import {BrowserRouter,} from "react-router-dom";
import {AnimatedRoutes} from "./components/AnimatedRoutes";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let persistor=persistStore(store);

// eslint-disable-next-line react-hooks/rules-of-hooks
root.render(
    <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS
                         theme={{
                             // use custom font in MantineProvider
                             fontFamily: 'Greycliff CF, sans-serif',
                         }}>
            <NotificationsProvider position="top-right" zIndex={2077}>
                <BrowserRouter>
                    <AnimatedRoutes/>
                </BrowserRouter>
            </NotificationsProvider>
        </MantineProvider>
    </Provider>

);

