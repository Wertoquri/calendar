import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    let navigate = useNavigate();
    let [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, []);

    let login = (token) => {
        localStorage.setItem('token', token);
        setIsAuth(true);
        navigate('/');
    }
    let logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        navigate('/login');
    }
    return {
        isAuth,
        login,
        logout
    }

}