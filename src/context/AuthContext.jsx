import React,{useState,useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/api'; 

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    
    const [authUser,setAuthUser] =useState(null)
    const [isLoggedIn,setIsLoggedIn] =useState(false)
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()    

    const getUser = async()=>{
        await axiosInstance.get('/users/auth').then((res)=>{
            setAuthUser(res.data.data)
            setIsLoggedIn(true)
        }).catch((e)=>{
            setErrors(e.response)
        });
        
    }

    useEffect(() => {
        try {
          getUser()
        } catch (e) {
            setErrors(e.response)
        }
    }, [])
    
    const login =async ({...data})=>{
        setErrors({})
        try{
            await axiosInstance.post('/users/login',data).then((res)=>{
                console.log(res.data.data)
                navigate('/contact')
            }).catch((e)=>{
                setErrors(e.response)
            })
            getUser()

        }catch(e){
            setErrors(e.response)
        }
    }
    const logout =async ()=>{

        try{
            axiosInstance.post('/users/logout').then((res)=>{
                console.log(res.data.message)
                setIsLoggedIn(false)
                setAuthUser(null)
            })
        }catch(e){
            setErrors(e.response)
        }
    }

    const value ={
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        login,
        errors,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

