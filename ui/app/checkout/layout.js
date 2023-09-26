
export default function CheckoutLayout({ children }) {

    return (
        <div>
            <div className="flex w-full bg-blue-600 p-5">
                <p className="text-2xl font-semibold text-white ml-11 ">E-market</p>
            </div>

            {children}
        </div>
    )
}