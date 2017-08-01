import React from "react";

const LoadingScreen = () => {
    return (
        <div className="boxed-view loading-screen">
            <h1 className="loading-screen__text">App is loading</h1>
            <img className="loading-screen__gif" src="/gifs/loading-gif.gif"/>
        </div>
    )
};

export default LoadingScreen;
