'use client'

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "../../../Utilities/checkout"
import Cookies from "js-cookie";
import "./form.css"
import Checkoutform from "@/components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51NojWCSDvGLF3UHdcJ9LG1G0EnmRjRiPddGI8nkD7HfwZA8m4jdP68LrNNAn99ghEkvVwMnOJgXg8DX2s6f7NUvU00wyqrk4KJ")

const Payment = () => {
    const [client, setClient] = useState()
    const [data, setData] = useState()
    const userID = Cookies.get("userId")
    
    useEffect(() => {
        try{
            api.getCart(userID).then(response => {
                setData(response.data.products)
            })
        }catch(err){
            console.log(err)
        }
        try{
            const item = {
                items: {
                    id: "t-shirt"
                }
            }
            api.payment(item).then(response => {
                const { clientSecret } = response.data
                setClient(clientSecret)
            })
        }catch(err){
            console.error(err.message)
        }   
    },[])

    const appearance = {
        theme: "stripe"
    }

    const options = {
        client,
        appearance
    }

    return (
        <div>
            {client ? (
                <Elements options={options} stripe={stripePromise}>
                    <Checkoutform />
                </Elements>
            ) : (<div> Not working </div>)}
        </div>
    )

}

export default Payment