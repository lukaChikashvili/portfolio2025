"use client"
import { createContext, useState } from "react";


export const UserContext = createContext();


const UserProvider = ({ children }) => {

    const [selectedProject, setSelectedProject] = useState(null);
    const [backArrow, setBackArrow] = useState(false);

    return (<UserContext.Provider value = {{selectedProject, setSelectedProject, backArrow, setBackArrow}} >
        {children}
    </UserContext.Provider>)
}


export default UserProvider;