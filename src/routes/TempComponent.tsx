import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({ setIsAuthenticated }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/')
    }, [])
    return (<></>)
}

