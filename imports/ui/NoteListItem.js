import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const NoteListItem = (props) => {
    return (
        <div onClick={() => {
            props.Session.set("selectedNoteId", props.note._id)
        }}>
            <h5>{ props.note.title || "Untitled note" }</h5>
            <p>{ moment(props.note.updatedAt).format("MMMM Do") }</p>
        </div>
    )
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {
    return {
        Session
    }
}, NoteListItem);
