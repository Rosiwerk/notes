import React from "react";
import Transition from "react-easy-transition";

import PrivateHeader from "./PrivateHeader";
import NoteList from "./NoteList";
import Editor from "./Editor";

const Dashboard = (props) => {
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
            <div className="dashboard">
                <PrivateHeader title="Notes"/>
                <div className="page-content">
                    <div className="page-content__sidebar">
                        <NoteList/>
                    </div>
                    <div className="page-content__main">
                        <Editor/>
                    </div>
                </div>
            </div>
        </Transition>
    )
}

export default Dashboard;
