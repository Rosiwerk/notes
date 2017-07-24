import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { createContainer } from "meteor/react-meteor-data";

import React from "react";
import { browserHistory } from "react-router";
import PropTypes from "prop-types";

import { Notes } from "./../api/notes";

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: ""
        };
    };
    handleBodyChange(event) {
        const body = event.target.value;
        this.setState({ body });
        this.props.call("notes.update", this.props.note._id, {
            body
        });
    };
    handleTitleChange(event) {
        const title = event.target.value;
        this.setState({ title });
        this.props.call("notes.update", this.props.note._id, {
            title
        });
    };
    handleNoteRemoval() {
        this.props.call("notes.remove", this.props.note._id);
        this.props.browserHistory.replace("/dashboard");
    };
    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    };
    render() {
        if (this.props.note) {
            return (
                <div className="editor">
                    <input
                        className="editor__input"
                        value={this.state.title}
                        placeholder="Note title"
                        onChange={this.handleTitleChange.bind(this)}
                    />
                    <textarea
                        className="editor__textarea"
                        value={this.state.body}
                        placeholder="Note description"
                        onChange={this.handleBodyChange.bind(this)}
                    ></textarea>
                    <div>
                        <button
                            className="button button--secondary"
                            onClick={this.handleNoteRemoval.bind(this)}
                        >Delete note</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="editor">
                    <p className="editor__message">
                        { this.props.selectedNoteId ?
                            "Note not found." :
                            "Pick or create note to get started."
                        }
                    </p>
                </div>
            );
        }
    };
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
        call: Meteor.call,
        browserHistory
    };
}, Editor);
