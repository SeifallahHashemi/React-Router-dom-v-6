import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import svg from '../img/search.svg';
import classes from '../styles/NoteFound.module.css';

const NotFound = () => {
    const [countDown, setCountDown] = useState(5)
    const navigate = useNavigate();
    useEffect(() => {
        let intervalId;
        if (countDown > 0) {
            intervalId = setInterval(() => {
                setCountDown(prevState => prevState - 1);
            }, 1000)
        }
        return () => clearInterval(intervalId)
    }, [countDown])
    useEffect(() => {
        setTimeout(() => {
            navigate('/');   // Hard code path
            // navigate(-1);  // dynamic path
        }, 5000)
    }, [])
    return(
        <div className={classes.notFound}>
            <img src={svg} alt="" className={classes.svg}/>
            <p className={classes.warning}>صفحه مورد نظر یافت نشد (در حال انتقال به صفحه اصلی {countDown})</p>
        </div>
    )
};
export default NotFound;