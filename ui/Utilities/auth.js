import axios from "axios";

const baseUrl = "http://localhost:5000/auth"

const signup = (data) => {
    const request = axios.post(`${baseUrl}/signup`, data)
    return request.then(response => response)
}

const login = (data) => {
    const request = axios.post(`${baseUrl}/login`, data)
    return request.then(response => response)
}

const google = () => {
    const request = axios.get(`${baseUrl}/login/success`)
    return request.then(response => response)
}

export default { signup, login, google}