import {useEffect, useState} from "react";

const storageName = 'authData';

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({token:jwtToken, userId: id}))
    }

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem(storageName))
        if (authData && authData.token) {
            login(authData.token, authData.id)
        }
        setReady(true)
    }, [])

    return { login, logout, token, userId, ready }
}
