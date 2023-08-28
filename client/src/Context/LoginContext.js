import { createContext, useState } from "react";

export const loginContext=createContext(null);


const ContextProvider =({children})=>{
    const [login,setLogin] =useState(false)
    return(
        <loginContext.Provider value={
                {
                    login,
                    setLogin
                }
        }>
            {children}
        </loginContext.Provider>
    )
}

export default ContextProvider;