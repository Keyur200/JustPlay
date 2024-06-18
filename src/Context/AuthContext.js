import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState()

    useEffect(()=>{
        axios.get('https://just-play-api-eight.vercel.app/auth/userdata', {withCredentials:true})
        .then(({data})=>{
            setUser(data)
        })
    },[])
    return (
        <AuthContext.Provider value={[user,setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth,AuthProvider}