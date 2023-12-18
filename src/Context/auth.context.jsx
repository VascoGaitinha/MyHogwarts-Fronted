import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND = "https://myhogwarts-server.adaptable.app";

const AuthContext = React.createContext();

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    /* Store the token in the local storage */
    const storeToken = (token) =>{
        localStorage.setItem('authToken', token);
    }

    /* Authenticate the User via JWT */
    const authenticateUser = () =>{
        // Get the stored token from the local storage
        const storedToken = localStorage.getItem('authToken');

        if(storedToken){
            axios.get(`${BACKEND}/auth/verify`, {headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response)=>{
                const user = response.data; 
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            })
            .catch(()=>{
                setIsLoggedIn(false);
                setIsLoading(true);
                setUser(null);
            })
        }
        else {
            setIsLoggedIn(false);
            setIsLoading(true);
            setUser(null);
        }
    }

    const removeToken = () =>{
        localStorage.removeItem('authToken');
    }

    const logOut = () =>{
        navigate('/')
        removeToken();
        authenticateUser();
    }

    useEffect(()=>{
        authenticateUser();
    }, []);

    return(
        <AuthContext.Provider value={{isLoggedIn, isLoading, user, storeToken, authenticateUser, logOut, BACKEND}}>
            {props.children}
        </AuthContext.Provider>
    )   
}

export {AuthProviderWrapper, AuthContext};