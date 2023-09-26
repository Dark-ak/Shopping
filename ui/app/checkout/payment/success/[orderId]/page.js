import React from 'react'
import api from '@/Utilities/checkout'
import Cookies from 'js-cookie'

const Success = ({params}) => {

    const orderId = params.orderId 
    return (
        <div className='flex justify-center mt-36'>
            <div className='flex flex-col items-center justify-center p-10 gap-5 bg-gray-300'>
                <p className='text-3xl font-bold'>Your order has been received</p>
                <div className='rounded-full bg-green-700 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <p className='text-2xl font-normal'>Thank you for your purchase !</p>
                <p>Your order ID is: {orderId}</p>
                <a href="/">
                    <button className='bg-blue-500 p-3 rounded-lg text-white'>Continue Shopping</button>

                </a>
            </div>
        </div>
    )
}

export default Success