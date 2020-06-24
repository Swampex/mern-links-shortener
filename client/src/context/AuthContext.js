import {createContext} from "react";

const noop = () => {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    isAuthenticated: false,
    login: noop,
    logout: noop,
})
