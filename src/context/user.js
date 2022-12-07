// import { createContext, useContext, useEffect, useState } from "react";
// import {createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
// import {auth} from "../firebase"
// export const UserContext = createContext();
// export  const useUserContext=()=>useContext(UserContext);

// // export const UserContext = createContext();
// export const UserContextProvider = (props) => {
//     const [user, setUser] = useState(null);

//     return (
//         <UserContext.Provider value = {{user : [user, setUser]}}>
//             {props.children}
//         </UserContext.Provider>

        
//     );
// }

import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {auth} from "../firebase"
export const UserContext = createContext();
export  const useUserContext=()=>useContext(UserContext);
 
export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,SetLoading]=useState(null);
    const [error,setError]=useState("");
 
    useEffect(()=>{
        SetLoading(true)
        const unsubscribe=onAuthStateChanged(auth,res=>{
            res?setUser(res):setUser(null);
            setError("");
            SetLoading(false);
        });
        return unsubscribe;
    },[]);
 
    const regUser=(email,name,password)=>{
        SetLoading(true)
        createUserWithEmailAndPassword(auth,email,password).then(()=>{
            return updateProfile(auth.currentUser,{
                displayName:name,
            });
        })
        .then(res=>console.log(res))
        .catch(err=>setError(err.message))
        .finally(()=>SetLoading(false));
    };
 
    const signInUser=(email,password)=>{
        SetLoading(true)
        signInWithEmailAndPassword(auth,email,password)
        .then(res=>console.log(res))
        .catch(err=>setError(err.message))
        .finally(()=>SetLoading(false));
 
    };
 
    const logoutUser=()=>{
        signOut(auth);
    };
 
    const forgotPwd=(email)=>{
        return sendPasswordResetEmail(auth,email); 
    };
 
    const contextValue={
        user : [user, setUser],
        loading,
        error,
        regUser,
        signInUser,
        logoutUser,
        forgotPwd,
    };
    return(
        // <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
        // <UserContext.Provider value = {{user : [user, setUser]}}>
                    <UserContext.Provider value = {contextValue}>

            {children}
        </UserContext.Provider>
    );
};