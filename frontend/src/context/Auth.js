import { createContext } from "react";

const AuthContext = createContext({
    user: false,
    setUser: () => { }
});

export default AuthContext;