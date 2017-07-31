import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export const NoteListItem = (props) => {
    const className = props.note.selected ? "item item--selected" : "item";
    return (
        <div className={className} onClick={() => {
            props.Session.set("selectedNoteId", props.note._id)
        }}>
            <h5 className="item__title">{ props.note.title || "Untitled note" }</h5>
            <p className="item__subtitle">{ moment(props.note.updatedAt).format("MMMM Do") }</p>
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
