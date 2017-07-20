import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import React from "react";
import PropTypes from "prop-types";

import { Notes } from "./../api/notes";

import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export const NoteList = (props) => {
    const renderNoteListItems = () => {
        if (props.notes.length !== 0) {
            return props.notes.map((note) => {
                return <NoteListItem key={note._id} note={note}/>
            });
        } else {
            return <NoteListEmptyItem/>;
        }
    };
    return (
        <div>
            <NoteListHeader/>

            {renderNoteListItems()}

            NoteList { props.notes.length }
        </div>
    )
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    Meteor.subscribe("notes");

    return {
        notes: Notes.find().fetch()
    };
}, NoteList);
