import React from 'react'
import api from '@/Utilities/checkout'
import Cookies from 'js-cookie'

const Failure = () => {

    const orderId = Math.floor(Math.random() * 1000000)

    // useEffect(() => {
    //     try{
    //         api.clear(Cookies.get("userId")).then(response => response)
    //     }catch(err){
    //         console.log(err)
    //     }
    // })

    return (
        <div className='flex justify-center mt-36'>
            <div className='flex flex-col items-center justify-center px-16 py-16 gap-5 bg-gray-300'>
                <p className='text-3xl font-bold'>Payment Failed</p>
                <div className='rounded-full bg-red-700 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </div>

                <p className='text-2xl font-normal'>Please try again after 5 mins</p>
                <p>Sorry for inconvienience</p>
                <div className='flex gap-5 mt-5'>
                <a href="/checkout/cart">
                    <button className='bg-white  p-3 rounded-lg text-black'>Go back to Cart</button>
                </a>
                <a href="/">
                    <button className='bg-blue-500 p-3 rounded-lg text-white'>Continue Shopping</button>
                </a>
                </div>
            </div>
        </div>
    )
}

export default Failure