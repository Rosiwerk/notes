import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { createContainer } from "meteor/react-meteor-data";

import React from "react";
import PropTypes from "prop-types";

import { Notes } from "./../api/notes";

export class Editor extends React.Component {
    handleBodyChange(event) {
        this.props.call("notes.update", this.props.note._id, {
            body: event.target.value
        });
    }
    handleTitleChange(event) {
        this.props.call("notes.update", this.props.note._id, {
            title: event.target.value
        });
    }
    handleNoteRemoval() {
        this.props.call("notes.remove", this.props.note._id);
    }
    render() {
        if (this.props.note) {
            return (
                <div>
                    <input
                        value={this.props.note.title}
                        placeholder="Note title"
                        onChange={this.handleTitleChange.bind(this)}
                    />
                    <textarea
                        value={this.props.note.body}
                        placeholder="Note description"
                        onChange={this.handleBodyChange.bind(this)}
                    ></textarea>
                    <button onClick={this.handleNoteRemoval.bind(this)}>Delete note</button>
                </div>
            );
        } else {
            return (
                <p>
                    { this.props.selectedNoteId ?
                        "Note not found." :
                        "Pick or create note to get started."
                    }
                </p>
            );
        }
    }
};

Editor.propTypes = {
    selectedNoteId: PropTypes.string,
    note: PropTypes.object
}

export default createContainer(() => {
    const selectedNoteId = Session.get("selectedNoteId");

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}, Editor);
