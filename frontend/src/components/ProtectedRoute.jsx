import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({element, adminOnly=false, cartRequired = false}) => {
    const {isAuthenticated,loading,user}=useSelector((state)=>state.user)
    const { cartItems } = useSelector((state) => state.cart)

     useEffect(() => {
        if ( !loading && isAuthenticated && cartRequired && cartItems.length === 0) 
            {
               toast.error("Please add a product to the cart",{position:"top-center",autoClose:3000});
    }},[loading, isAuthenticated, cartRequired, cartItems.length]);

    if(loading)
    {
        return <p>Loading...</p>
    }

    if(!isAuthenticated)
    {
        return <Navigate to="/login"/>
    }

    if(adminOnly && user.role!="admin")
    {
       return <Navigate to="/"/>
    }
  

    if(cartRequired && cartItems.length===0)
    {
        return <Navigate to="/products" replace/>;
    }
  return element;

}
