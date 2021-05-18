import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
  const authState = useAuthContext();
  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthContext() { 
  const _cookie = window.localStorage.getItem("authState") 
  const initalState = _cookie ? JSON.parse(_cookie) : {isAuthenticated: false, user: null};
    
  const [authState, setAuthState] = useState(initalState);

  const login = (newState) =>  { 
    setAuthState(newState);
    window.localStorage.setItem("authState", JSON.stringify(newState));
  };

  const logout = () => {
    setAuthState({isAuthenticated: false, user: null});
    window.localStorage.removeItem("authState");
  }

  /*useEffect(() => {
    const authCookie = JSON.parse(window.localStorage.getItem("authState"));
    if(authCookie)
      setAuthState(authCookie)
    else
      setAuthState({isAuthenticated: false, user: null});

    console.log('--- useEffect [] ---');
    console.log(authCookie);

  }, [])

  useEffect(() => {
    console.log('--- useEffect [authState] ---');
    console.log(authState);
  }, [authState])
  */
 
  return {
    authState,
    login,
    logout
  }
}