'use client'

import { Formik, ErrorMessage, Field, Form } from "formik"
import * as Yup from "yup"
import google from "@/public/google.png"
import logo from "@/public/tlogo.png"
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/Utilities/auth"


export default function Signup() {

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
    }

    const router = useRouter()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        phone: Yup.number().required("Phone number is Required").min(10, "Enter Valid number"),
        password: Yup.string().required("Password is required").min(6, "Password must be of atleast 6 characters")
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await api.signup(values)
                .then(repsonse => {
                    if(repsonse.status == 201){
                        router.push("/auth/login")
                    }
                })
        }catch(err){
            console.error(err)
        }

        setSubmitting(false)
    }

    return (
        <div className="flex justify-center bg-slate-300 h-screen">
            <div className="flex flex-col gap-5 bg-white h-fit md:w-2/5 md:h-fit p-5 pb-20 mt-11">
                <div>
                    <Image src={logo} alt="logo" width={80} />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-3xl font-bold">Join Us!!!</p>
                        <p className="text-xs text-gray-400"> Buy millions of products at affordable price</p>

                        <div className="flex border-gray-500 gap-3 mt-4 border-2 p-2 items-center justify-center rounded-lg w-64 cursor-pointer hover:shadow-xl ">
                            <Image src={google} alt="g" height={17} width={17} /><span className="text-sm">Sign up With Google</span>
                        </div>
                    </div>

                    <div>
                        <hr></hr>or<hr></hr>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched, values, handleChange }) => (

                            <Form className="flex flex-col gap-5">

                                <div>
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                                    <Field type="text" name="name" value={values.name} onChange={handleChange} className={classNames("focus:outline-none border-b-2 focus:border-gray-600", { "border-red-500": errors.name && touched.name })} placeholder="Name" />
                                </div>

                                <div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs my-1" />
                                    <Field type="text" name="email" value={values.email} onChange={handleChange} className={classNames("focus:outline-none border-b-2 focus:border-gray-600", { "border-red-500": errors.email && touched.email })} placeholder="Email" />
                                </div>

                                <div>
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-xs my-1" />
                                    <Field type="number" name="phone" value={values.phone} onChange={handleChange} className={classNames("focus:outline-none border-b-2 focus:border-gray-600", { "border-red-500": errors.phone && touched.phone })} placeholder="Phone" />
                                </div>

                                <div>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs my-1" />
                                    <Field type="password" name="password" value={values.password} onChange={handleChange} className={classNames("focus:outline-none border-b-2 focus:border-gray-600", { "border-red-500": errors.password && touched.password })} placeholder="Password" />
                                </div>

                                <button disabled={isSubmitting} type="submit" className="bg-blue-950 rounded text-white mt-4 hover:bg-white hover:text-blue-950 border-blue-950 border-[1px]">Sign in</button>
                            </Form>

                        )}

                    </Formik>
                </div>

                <div className="flex justify-center">
                    <p className="text-xs text-gray-500">Already have an account? <Link href='/auth/login' className="text-black font-semibold hover:bg-gray-200 cursor-pointer">Log in</Link></p>
                </div>
            </div>
        </div>
    )
}
