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
        }).catch((error)=>{
            console.log(error.response.data)
        });
        
    }

    useEffect(() => {
        try {
          getUser()
        } catch (error) {
          console.log(error.message)
        }
    }, [])
    
    const login =async ({...data})=>{
        setErrors({})
        try{
            await axiosInstance.post('/users/login',data).then((res)=>{
                console.log(res.data.data)
                navigate('/contact')
            }).catch((error)=>{
                console.log(error.response.data)
            })
            getUser()

        }catch(e){
            if(e.response.status ===401){
                setErrors(e.response.data);
                console.log(e.response.data.message)
            }
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
            if(e.response.status ===422){
                setErrors(e.response.data.errors);
            }
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

