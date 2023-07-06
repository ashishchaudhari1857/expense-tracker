import React from 'react';
import Context from './Context';
import { useContext } from 'react';
import { useState } from 'react';

const ContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');
    const [token, setToken]= useState(initialToken)
    const isLogged = !!token;

    const login =(token)=>{
  setToken(token);
  localStorage.setItem('token',token)
    }
    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null);
    }
   const obj={
        login:login,
        logout:logout,
        token:token,
        isLogged:isLogged
    }
  return (

    <Context.Provider value={obj}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;

const useGlobalContext =()=>{
    return(
        useContext(Context)
    )
}

export  { useGlobalContext};