'use client'

import React, { useEffect, useState } from "react";
import google from "@/public/google.png"
import logo from "@/public/tlogo.png"
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import api from "@/Utilities/auth"
import { useRouter } from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()

    const router = useRouter()

    const isEmail = (value) => {

    }


    const handleClick = async (e) => {
        e.preventDefault()
        if (email == "" || password == "") {
            setError("Please Fill all the fields")
        }
        const data = {
            email: email,
            password: password
        }

        try {
            const response = await api.login(data)
                .then(response => {
                    if (response.status == 200) {
                        const data = response.data.data
                        Cookies.set("authToken", data.token, { secure: true });
                        Cookies.set("userId", data.id)
                        Cookies.set("userName", data.name)
                        router.push("/")
                    }
                }).catch(err => {
                    setError(err.response.data.message)
                })
        } catch (err) {
            console.error(err.message)
        }
    }

    const authGoogle = async () => {
        window.location.href = "http://localhost:5000/auth/google"
    }

    return (
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className="flex flex-col gap-5 bg-white h-fit md:w-2/5 md:h-5/6 p-5 pb-20 mt-11">
                <div>
                    <Image src={logo} alt="logo" width={80} />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-3xl font-bold">Welcome Back</p>
                        <p className="text-xs text-gray-400">Welcome Back! Please Enter Your Details</p>

                        <div className="flex border-gray-500 gap-3 mt-4 border-2 p-2 items-center justify-center rounded-lg w-64 cursor-pointer hover:shadow-xl" onClick={() => { authGoogle() }}>
                            <Image src={google} alt="google" height={17} width={17} /><span className="text-sm">Log in With Google</span>
                        </div>
                    </div>

                    <div>
                        <hr></hr>or<hr></hr>
                    </div>

                    <form className="flex flex-col justify-center items-center gap-1">
                        {error && <p className="m-2 text-sm text-red-500">{error}</p>}

                        <div>
                            <input className="focus:outline-none border-b-2 focus:border-gray-600" type="email" placeholder="Email" onChange={() => setEmail(event.target.value)} required />
                        </div>

                        <div className=" mt-3">
                            <input className="focus:outline-none border-b-2 focus:border-gray-600" type="password" placeholder="Password" onChange={() => setPassword(event.target.value)} required />
                        </div>



                        <button onClick={() => handleClick(event)} type="submit" className="bg-blue-950 rounded text-white mt-4 hover:bg-white hover:text-blue-950 border-blue-950 border-[1px] w-full">Log in</button>
                    </form>
                </div>

                <div className="flex justify-center">
                    <p className="text-xs text-gray-500">Don't have an account? <Link href="/auth/signup" className="text-black font-semibold hover:bg-gray-200 cursor-pointer">Sign up for free</Link></p>
                </div>

                <div className="flex justify-center">
                    <p></p>
                    <p className="text-xs text-gray-500 hover:border-blue-500 hover:border-b-[1px] cursor-pointer">Forgot Password?</p>
                </div>
            </div>
        </div>
    )
}
