import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');   // Hard code path
            // navigate(-1);  // dynamic path
        }, 1000)
    }, [])
    return(
        <h1>NotFound Page</h1>
    )
};
export default NotFound;