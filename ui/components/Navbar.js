'use client'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { tokenCheck } from '@/Utilities/tokenCheck'
import { fetchProductByCategory, setSelectedCategory } from '@/Stores/productSlice'
import { change } from '@/Stores/checkSlice'
import title from "@/public/logo.png"
import Link from 'next/link'
import Image from 'next/image'
import Cookies from 'js-cookie'


const Navbar = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [check, setCheck] = useState(false)
    const [username, setUsername] = useState()

    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchProductByCategory("all"))
        if (tokenCheck()) {
            setIsAuthenticated(true)
            setUsername(Cookies.get("userName"))
        }
    }, [])

    const setCategory = (category) => {
        dispatch(setSelectedCategory(category))
        dispatch(fetchProductByCategory(category))
    }

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const cart = () => {
        if (isAuthenticated) {
            router.push("/checkout/cart")
        }
        else {
            dispatch(change())
        }
    }

    const order = () => {
        if (isAuthenticated) {
            router.push("/checkout/cart")
        }
        else {
            dispatch(change())
        }
    }


    const logout = () => {
        Cookies.remove("authToken")
        Cookies.remove("userId")
        Cookies.remove("email")
        Cookies.remove("connect.sid")
        window.location.reload();
    }

    return (
        <div className="bg-white border">
            <div className="py-3 px-6">
                <div className="flex justify-between">
                    <div className="flex items-center text-xs lg:text-lg ">
                        <Image src={title} alt="logo" width={120}/>
                    </div>

                    <div className="ml-6 flex flex-1 gap-x-3">
                        <input type="text" className="w-full rounded-md border-[0.5px] border-[#DDE2E4] px-3 py-2 text-sm" placeholder='Search' />
                    </div>
                    <div className='ml-2 flex sm:hidden'>
                        <button className="relative z-10 flex items-center p-2 text-sm" onClick={toggle}>
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        </button>

                        {isOpen &&
                            (<div className="absolute right-0 z-20 w-56 py-2 mt-10 mr-6 overflow-hidden  bg-white rounded-md shadow-xl border-gray-200 border">
                                <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium">Orders</span>
                                </div>


                                <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100" onClick={() => cart()}>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">Cart</span>
                                </div>

                                {isAuthenticated ? (
                                    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100" onClick={() => { logout() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                        </svg>
                                        <span className="text-sm font-medium">Log Out</span>
                                    </div>
                                ) : (
                                    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100" onClick={() => router.push("/auth/login")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>

                                        <span className="text-sm font-medium">Log in</span>
                                    </div>
                                )}

                            </div>)}
                    </div>

                    <div className="ml-2 hidden sm:flex">
                        <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">Orders</span>
                        </div>

                        <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100" onClick={() => cart()}>
                            <div className="relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Cart</span>
                        </div>

                        {isAuthenticated ? (
                            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4">
                                <div className='flex justify-center items-center hover:bg-gray-100"' onClick={() => setCheck(!check)}>
                                    <p className='text-sm'>{username}</p>
                                    <span className="material-symbols-outlined em">
                                        expand_more
                                    </span>

                                </div>
                                {check && (
                                    <div className='absolute z-20 right-0 w-32 mt-14 mr-10  overflow-hidden rounded-md shadow-xl border-gray-200 border hover:bg-gray-200'>
                                        <div className='flex p-2 ' onClick={() => logout()}>
                                            <p className='text-sm'>Logout</p>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) :
                            (
                                <Link className="text-sm font-medium" href="/auth/login">
                                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
                                        <p>Sign in</p>
                                    </div>
                                </Link>
                                )
                        }
                            </div>
                </div>

                    <div className="mt-4 hidden md:flex items-center justify-between">
                        <div className="flex gap-x-2 py-1 px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">India</span>
                        </div>

                        <div className="flex gap-x-8">
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="all">All</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="smartphones">Smartphones</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="laptops">Laptops</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="skincare">Skincare</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="furniture">Furniture</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="automotive">Automotive</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="womens-jewellery">Women's Jwellery</span>
                            <span onClick={() => setCategory(event.target.id)} className="cursor-pointer rounded-sm py-1 px-2 text-xs  font-medium hover:bg-gray-100" id="sunglasses">Sunglasses</span>
                        </div>

                    </div>
                </div>
            </div>
            )
}

            export default Navbar