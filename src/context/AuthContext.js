import React from 'react';

const AuthContext = React.createContext();

export function AuthProvider({children}) {
  const [authState, setAuthState] = React.useState({
    isAuthenticated: false,
    user: null
  });

  return(
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const state = React.useContext(AuthContext);
  console.log('useAuth state');
  console.log(state);

  const isAuthenticated = state.isAuthenticated;

  return {
    ...state,
    isAuthenticated
  }
}

//export default { AuthProvider, useAuth };