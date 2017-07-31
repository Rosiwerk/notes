import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import React from "react";

import { Notes } from "./../api/notes";

import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }
    renderNoteListItems() {
        if (this.props.notes.length === 0) {
            return <NoteListEmptyItem/>;
        } else if (!this.state.searchText) {
            return this.props.notes.map((note) => {
                return <NoteListItem key={note._id} note={note}/>
            });
        }

        return this.props.notes.filter((note) => {
            const title = note.title.toLowerCase();
            return title.includes(this.state.searchText.toLowerCase());
        }).map((note) => {
            return <NoteListItem key={note._id} note={note}/>
        });
    };
    handleSearchTextChange(event) {
        const searchText = event.target.value;
        this.setState({ searchText });
    };
    render() {
        return (
            <div className="item-list">
                <NoteListHeader/>

                <div className="item-list__search">
                    <input
                        className="item-list__search-text"
                        placeholder="Search notes"
                        value={this.state.searchText}
                        onChange={this.handleSearchTextChange.bind(this)}
                    />
                </div>

                {this.renderNoteListItems()}
            </div>
        )
    };
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    const selectedNoteId = Session.get("selectedNoteId");
    const searchText = Session.get("searchText");

    Meteor.subscribe("notes");

    return {
        notes: Notes.find({}, {
            sort: {
                updatedAt: -1
            }
        }).fetch().map((note) => {
            return {
                ...note,
                selected: note._id === selectedNoteId
            };
        })
    }
}, NoteList);
