import React, { useEffect } from 'react';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const [authState, setAuthState] = React.useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (newState) => setAuthState(newState);
  const logout = () => setAuthState({isAuthenticated: false, user: null});

  useEffect(() => {
    const userCookie = window.localStorage.getItem("authState");
    if(userCookie) setAuthState(JSON.parse(userCookie));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState])

  return(
    <AuthContext.Provider value={{authState, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = React.useContext(AuthContext);
  const state = data.authState;
  const isAuthenticated = data.authState.isAuthenticated;
  const login = data.login;
  const logout = data.logout;

  return {
    state,
    isAuthenticated,
    login,
    logout
  }
}

//export default { AuthProvider, useAuth };