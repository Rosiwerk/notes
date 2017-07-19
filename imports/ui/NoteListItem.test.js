import { Meteor } from "meteor/meteor";
import React from "react";

import expect from "expect";
import { mount } from "enzyme"
import moment from "moment";

import NoteListItem from "./NoteListItem";

if (Meteor.isClient) {
    describe("NoteListItem", function () {

        it("should render note title and updated at time", function () {
            const note = { title: "Test Title", updatedAt: moment().valueOf() };
            const wrapper = mount( <NoteListItem key={note._id} note={note}/> )

            expect(wrapper.find("h5").text()).toBe(note.title);
            expect(wrapper.find("p").text()).toBe(moment(note.updatedAt).format("MMMM Do"));
        });

        it("should render Untitled Note if title string is empty", function () {
            const note = { title: "" };
            const wrapper = mount( <NoteListItem key={note._id} note={note}/> )

            expect(wrapper.find("h5").text()).toBe("Untitled note");
        });

    });
}
