import axios from "axios";

const baseUrl = "http://localhost:5000/checkout"

const getCart = (userId) => {
    const request = axios.get(`${baseUrl}/cart/${userId}`)
    return request.then(response => response)
}

const addtoCart = (data) => {
    const request = axios.post(`${baseUrl}/cart`, data)
    return request.then(response => response)
}

const remove = (userId,productId) => {
    const request = axios.put(`${baseUrl}/cart/${userId}/${productId}`)
    return request.then(response => response)
}

const clear = (userId) => {
    const request = axios.delete(`${baseUrl}/cart/${userId}`)
    return request.then(response => response)
}

const checkAddress = (userId) => {
    const request = axios.get(`${baseUrl}/cart/address/${userId}`)
    return request.then(response => response)
}

const addAddress = (id,data) => {
    const request = axios.post(`${baseUrl}/cart/address/${id}`,data)
    return request.then(response => response)
}


const payment = (id) => {
    const request = axios.post(`${baseUrl}/cart/create-checkout-session`, id)
    return request.then(response => response)
}


export default { addtoCart, getCart, remove, payment, clear, checkAddress, addAddress }