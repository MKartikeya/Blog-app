import {createContext,useState,useEffect} from 'react';
import axios from 'axios';
import {URL} from '../url';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user,setUser]=useState(null);
    useEffect(()=>{
        getUser();
    },[]);
    const getUser=async()=>{
        // try{

        //     const res= await axios.get(URL+"/api/auth/refetch",{withCredentials:true});
        //     console.log(res.data);  
        //     setUser(res.data);

        // } catch(err){
        //     console.log(err);
        // }
        try {
            //getting user from local storage
        const use = JSON.parse(localStorage.getItem("user"));
        if (use) {
            setUser(use);
        }
        //fetching  user details


        } catch(err){
            console.log(err);
        }
    }

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )

}