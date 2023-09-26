"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import checkout from '@/Utilities/checkout'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const Contact = () => {
  const [edit, setEdit] = useState(false)
  const [address, setaddress] = useState()
  const [pincode, setPincode] = useState()
  const [state, setState] = useState()

  const router = useRouter()

  useEffect(() => {
    try {
      checkout.checkAddress(Cookies.get("userId")).then(response => {
        if (response.status == 200) {
          const { street, pincode, state } = response.data
          console.log(response)
          setState(state)
          setPincode(pincode)
          setaddress(street)
          setEdit(true)
        }

      })
    }
    catch (err) {
      console.log(err)
    }
  })
  const change = async () => {
    setEdit(true)
    try {
      const id = Cookies.get("userId")
      const data = {
        street: address,
        pincode: pincode,
        state: state
      }
      await checkout.addAddress(id, data).then(response => {
        if (response.status == 201) {
          setEdit(true)
          console.log("done")
        }

        else {
          console.log("error")
        }
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  const makePayment = async () => {
    const id = {
      id: Cookies.get("userId")
    }
    try {
      const response = await checkout.payment(id).then(response => response.data)
      router.push(response.url)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className='border-[1px] rounded-2xl p-5'>
        <div className='flex items-center justify-between'>
          <p className='font-bold text-lg'>Delivery Address</p>
          {edit ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => setEdit(false)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={change} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          )}
        </div>
        <div className='m-4'>
          <div>
            <p className='font-semibold text-base mb-1'>Street Address</p>
            {edit ? (<p className='text-slate-500 font-medium'>{address}</p>) :
              (
                <input type="text" className='border-b-2 focus:outline-none w-full my-2 px-1' onChange={() => setaddress(event.target.value)} />
              )}
          </div>
          <div className='flex justify-between mt-5'>
            <div>
              <p className='font-semibold'>Pincode</p>
              {edit ? (<p className='text-slate-500 font-medium'>{pincode}</p>) :
                (
                  <input type="text" onChange={() => setPincode(event.target.value)} />
                )}
            </div>
            <div className='pr-10'>
              <p className='font-semibold'>State</p>
              {edit ? (<p className='text-slate-500 font-medium'>{state}</p>) : (
                <select name="state" id="state" class="form-control" className='w-[100%]' onChange={() => setState(event.target.value)}>
                  <option value="" disabled >Select Your State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <button className='bg-blue-600 text-white p-2 w-full relative shadow-gray-400 active:top-0.5 ease-in-out border-white rounded-lg shadow-lg' onClick={makePayment}>Place Order</button>
      </div>
    </div>
  )
}

export default Contact