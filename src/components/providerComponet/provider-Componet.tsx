"use client";

import AuthContextProvider from '@/context/authContext'
import ShowNumberItemProvider from '@/context/cartContext'
import { WishlistProvider } from '@/context/wishlistContext'
import React from 'react'
import TopBar from '../common/topnavbar'
import { Toaster } from '../ui/sonner'
import FreshCartFooter from '../common/Footer'
import FreshCartNavbar from '../common/navbar'  
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
export default function ProviderComponent({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Provider store={store}>
                <AuthContextProvider>
                    <ShowNumberItemProvider>
                        <WishlistProvider>
                        <TopBar />
                        <FreshCartNavbar />
                        {children}
                        <Toaster position="top-center" richColors />
                        <FreshCartFooter />
                        </WishlistProvider>
                    </ShowNumberItemProvider>
                </AuthContextProvider>
            </Provider>

        </>
    )
}
