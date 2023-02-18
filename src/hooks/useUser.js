import axios from 'axios';
import { useState, useEffect } from "react";

export default function useUser() {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)


    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password });
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            const responseLogin = await axios.get('http://127.0.0.1:8000/api/me')
            localStorage.setItem('token', response.data.token);
            setUser(responseLogin.data)
            setToken(response.data.token)
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    useEffect(() => {
        const tempToken = localStorage.getItem('token');
        if (!tempToken) {
            setLoading(false)
            return
        }
        // le token existe 

        tryLogin(tempToken)

        async function tryLogin(tok) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${tok}`;
            const response = await axios.get('http://127.0.0.1:8000/api/me')
            setLoading(false)
            setUser(response.data)
        }

    }, []);

    return {
        user,
        login,
        logout,
        token,
        loading,
        isLoggedIn: !!user?.id,
    }
}