import Cookies from "js-cookie";

export const tokenCheck = () => {
    const authToken = Cookies.get('authToken')    
    if(!authToken){
        return false
    }

    return true


} 