import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { createContainer } from "meteor/react-meteor-data";

import React from "react";
import PropTypes from "prop-types";

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.meteorCall("notes.insert", (err, res) => {
                    if (res) {
                        props.Session.set("selectedNoteId", res);
                    }
                });
            }}>Add new note</button>
        </div>
    )
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
}, NoteListHeader);
