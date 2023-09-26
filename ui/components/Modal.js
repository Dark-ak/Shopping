import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { change } from '@/Stores/checkSlice'

const Modal = () => {

  const check = useSelector((state) => state.check)
  const dispatch = useDispatch();

  const close = (event) => {
    dispatch(change())
    console.log(check)
  }

  if (check) {
    return (
      <div className="fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex-col flex justify-center items-center" onClick={(event) => close(event)}>
        <div className='bg-white p-4 gap-5 rounded flex items-center justify-center flex-col' onClick={(event) => event.stopPropagation()}>
          <h1 className='font-semibold text-2xl'>Unauthorised</h1>
          <p className='text-xl'>Please <Link href="/auth/login" className='bg-black text-white text-base p-1 rounded shadow-2xl'>Login</Link> or <Link href="/auth/signup" className=" border-2 text-gray-400 text-base p-1 rounded shadow-2xl" >Sign Up</Link></p>
        </div>
      </div>
    )
  }
}
export default Modal