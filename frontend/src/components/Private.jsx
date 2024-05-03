//The private objects checks if a user is not directly
//going to the track component without loggin in
import { Navigate } from "react-router-dom";
import { userAuth } from "../contexts/userAuth";
import { useContext } from "react";

export default function Private(props)
{
    const loggedData = useContext(userAuth);

    return (
     
        loggedData.loggedUser!==null?
        <props.Component/>
        :
        <Navigate to = "/login"/> 
       
    )
}