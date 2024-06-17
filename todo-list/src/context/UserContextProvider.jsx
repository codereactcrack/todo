import { useEffect, useState } from "react"
import UserContext from "./UserContext"

const UserContextProvider = ({children})=>{

    const localUser = JSON.parse(localStorage.getItem('user'));
    const [currentUser,setCurrentUser] = useState(localUser || {});

    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(currentUser));
    }, [currentUser])
    
    return(
        <UserContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider