import React from "react";

import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page not found</h1>
                <p>We are sorry, but that page does not exist.</p>
                <Link to="/" className="button button--link">HEAD HOME</Link>
            </div>
        </div>
    )
};

export default NotFound;
