import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Book = () => {
    return(
        <Fragment>
            <h1>Book Page in Loaded</h1>
            <NavLink to={"p1"}>Navigate to book 1</NavLink>
            <NavLink to={"p2"}>Navigate to book 2</NavLink>
        </Fragment>
    )
};
export default Book;