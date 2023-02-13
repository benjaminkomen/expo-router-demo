import React from "react";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function Provider(props) {
  const {getItem, setItem, removeItem} = useAsyncStorage("USER");
  const [user, setAuth] = React.useState(undefined);

  React.useEffect(() => {
    getItem().then((json) => {
      console.log("json", json);
      if (json != null) {
        setAuth(JSON.parse(json));
      } else {
        setAuth(null);
      }
    });
  }, []);

  return (
      <AuthContext.Provider
          value={{
            signIn: () => {
              setAuth({});
              setItem(JSON.stringify({}));
            },
            signOut: () => {
              setAuth(null);
              removeItem();
            },
            user,
          }}
      >
        {props.children}
      </AuthContext.Provider>
  );
}