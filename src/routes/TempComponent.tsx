import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TempComponent = ({ setIsAuthenticated }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/')
    }, [])
    return (<></>)
}

export default TempComponent
