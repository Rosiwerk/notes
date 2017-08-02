import React from "react";

const LoadingScreen = () => {
    return (
        <div className="boxed-view loading-screen">
            <h1 className="loading-screen__text">App is loading</h1>
            <div className="lds-css ng-scope">
              <div className="lds-rolling">
                <div></div>
              </div>
            </div>
        </div>
    )
};

export default LoadingScreen;
