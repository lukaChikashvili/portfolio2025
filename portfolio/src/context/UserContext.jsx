"use client"
import { createContext, useState } from "react";


export const UserContext = createContext();


const UserProvider = ({ children }) => {

    const [selectedProject, setSelectedProject] = useState(null);

    return (<UserContext.Provider value = {{selectedProject, setSelectedProject}} >
        {children}
    </UserContext.Provider>)
}


export default UserProvider;