import axios from "axios";

const baseUrl = "https://dummyjson.com"


const allProducts = () => {
    const request = axios.get(`${baseUrl}/products`);
    return request.then(response => response.data)
}

const categories = (category) => {
    const request = axios.get(`${baseUrl}/products/category/${category}`);
    return request.then(response => response.data)
}


export default {allProducts, categories}