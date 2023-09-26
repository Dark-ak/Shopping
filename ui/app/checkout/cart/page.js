"use client"


import React, { useEffect } from 'react'
import api from "@/Utilities/checkout"
import { useState } from 'react'
import Cookies from 'js-cookie'
import Contact from '@/components/Contact'

const Cart = () => {

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [delivery, setDelivery] = useState(true)
    const [discount, setDiscount] = useState(0)
    const [isEmpty, setIsEmpty] = useState(true)
    const userId = Cookies.get("userId")

    const fetchCart = async () => {
        await api.getCart(userId)
            .then(response => {
                if (response.status == 200) {
                    setCart(response.data.products)
                    setTotal(response.data.total)
                    setIsEmpty(false)
                }
                else if (response.status == 204) {
                    setIsEmpty(true)
                }
            }).catch(err => {
                console.log(err)
            })
    }



    useEffect(() => {
        fetchCart()
        setDiscount((total * 0.05).toFixed(2))

        if (total - discount > 50) {
            setDelivery(false)
        }
        else {
            setDelivery(true)
        }

    }, [total, discount])


    const increase = async (productId, name, img, price) => {
        const data = {
            id: userId,
            productId: productId,
            name: name,
            image: img,
            price: price,
            quantity: 1

        }
        try {
            await api.addtoCart(data)
                .then(response => {

                    if (response.status == 201) {
                        fetchCart();
                        console.log("Done");
                    }
                }).catch(err => {
                    console.log(err.message)
                })
        } catch (err) {
            console.log(err)
        }
    }


    const decrease = async (productId) => {
        try {
            await api.remove(userId, productId)
                .then(response => {
                    if (response.status == 200) {
                        fetchCart()
                    }
                })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="m-10">
            <p className="text-2xl mb-2  font-bold">My Cart</p>
            <div>
                {isEmpty ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className="gap-5 grid grid-cols-[2fr_1fr]">
                        <div className='flex flex-col gap-3'>

                            <div className='flex flex-col border-[1px] border-gray-400 rounded-2xl p-2'>

                                <div>
                                    {cart.map(product => {
                                        return (
                                            <div key={product.productId} className='border-b-2 m-5'>
                                                <div className='flex justify-between my-5'>
                                                    <div className='flex gap-4'>
                                                        <img className='h-28 w-28 object-fill' src={product.image} alt="product" />
                                                        <div>
                                                            <p className='font-semibold text-lg'>{product.name}</p>
                                                            <p>${product.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <div className='border-2 border-gray-300 rounded-full p-1 hover:bg-slate-300' onClick={() => decrease(product.productId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                            </svg>
                                                        </div>


                                                        <p className='text-xl'>{product.quantity}</p>

                                                        <div className='border-2 border-gray-300 rounded-full p-1 hover:bg-slate-300' onClick={() => increase(product.productId, product.name, product.image, product.price)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>

                            </div>
                        </div>
                        <div className="flex gap-4 flex-col">

                            <div className="border-[1px] p-5 border-gray-300 rounded-2xl">

                                <p className="font-bold text-lg">Payment Details</p>

                                <div className="text-lg text-slate-500 font-semibold m-2">
                                    <div className="flex border-b-2 justify-between p-1">
                                        <p>MRP Total</p>
                                        <p>${total}</p>
                                    </div>

                                    <div className="flex border-b-2 justify-between p-1">
                                        <p>Product Discount</p>
                                        <p>${discount}</p>
                                    </div>

                                    <div className="flex border-b-2 justify-between p-1">
                                        <div>
                                            <p>Delivery Fee</p>
                                            <p className="text-sm">Free Delivery above $50</p>
                                        </div>
                                        <p>
                                            ${delivery ? 20 : <del>20</del>}
                                        </p>
                                    </div>

                                    <div className="flex border-b-2 justify-between p-1">
                                        <p>Total</p>
                                        {delivery ? <p>${(total + 20) - discount}</p> : <p>${total - discount}</p>}
                                    </div>
                                </div>

                            </div>

                            <Contact />

                        </div>
                    </div>
                )}
            </div>
        </div>


    )
}

export default Cart