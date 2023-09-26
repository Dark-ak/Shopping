'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { selectFilteredProducts } from '@/Stores/selector'
import { useDispatch } from 'react-redux'
import {set,empty} from "@/Stores/alertSlice"
import api from "@/Utilities/checkout"
import Cookies from 'js-cookie'


const Card = () => {

    const filteredProducts = useSelector(selectFilteredProducts);
    const check = filteredProducts?.[0] || []
    const userId = Cookies.get("userId")
    const dispatch = useDispatch()

    const atc = async (productid, name, image, price) => {
        console.log(userId)
        const data = {
            id: userId,
            productId: productid,
            name: name,
            image: image,
            price: price,
            quantity: 1
        }

        try {
            await api.addtoCart(data).then(
                response => {
                    if(response.status == 201){
                        console.log("added")
                        dispatch(set("Add to cart"))
                        setTimeout(() => {
                            dispatch(empty())
                        },2000)
                    }
                }
            )
        } catch (err) {
            console.log(err)
        }


    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-10 gap-10 items-center'>

            {check.map(product => {
                return (
                    <div className='flex flex-col gap-5 hover:scale-110 duration-500' key={product.id}>
                        <img src={product.images[0]} className='h-60 w-46 object-fill' alt="product_img" srcSet="" />

                        <div className='flex flex-col justify-start gap-2'>
                            <div className='flex justify-between'>
                                <p className='text-lg font-bold'>{product.title}</p>
                                <p className='text-lg font-bold'>${product.price}</p>
                            </div>
                            <p className='text-sm text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap'>{product.description}</p>
                            <p>Rating: <span className='work'>{product.rating} of 5</span></p>
                            <div className='flex justify-between items-center'>
                                <button onClick={() => { atc(product.id, product.title, product.images[0], product.price) }} className='border rounded-2xl py-2 px-2 border-black hover:bg-black hover:text-white transition-colors duration-300'>
                                    Add to cart
                                </button>
                                <span className="material-symbols-outlined border bg-white pt-1 px-1 rounded-full hover:bg-red-300 transition-colors duration-300">
                                    favorite
                                </span>
                            </div>
                        </div>
                    </div>

                )
            }
            )}
        </div>

    )
}

export default Card