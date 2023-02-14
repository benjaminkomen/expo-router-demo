import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
      <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            signIn: () => setIsLoggedIn(true),
            signOut: () => setIsLoggedIn(false)
          }}
      >
        {props.children}
      </AuthContext.Provider>
  );
}