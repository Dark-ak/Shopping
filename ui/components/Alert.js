
import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {

    const msg = useSelector((state) => state.alert)

    if (msg) {
        return (
            <div class="inset-0 sticky z-50 flex-col float flex justify-center items-center p-5">
                <div class="w-auto px-5 py-3 rounded-full bg-black flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p class="text-white text-lg">{msg}</p>
                </div>
            </div>
        )
    }
}

export default Alert