import React from "react";

import { Link } from "react-router";
import Transition from "react-easy-transition";

const NotFound = () => {
    return (
        <Transition
            path={location.pathname}
            initialStyle={{
                opacity: 0,
                transform: "scale(1.2)",
                overflow: "hidden"
            }}
            transition="all .8s ease"
            finalStyle={{
                opacity: 1,
                transform: "scale(1)"
            }}>
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Page not found</h1>
                    <p>We are sorry, but that page does not exist.</p>
                    <Link to="/" className="button button--link">HEAD HOME</Link>
                </div>
            </div>
        </Transition>
    )
};

export default NotFound;
