import React from "react";
import { Link } from "react-router-dom";
 
const NotFound = () => {
    return (
        <div className="container">
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to ="/">
                <p>Click to back to home page.</p>
            </Link>
        </div>
        
    )
}

export default NotFound;