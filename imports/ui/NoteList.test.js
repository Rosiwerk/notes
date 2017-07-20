import { Meteor } from "meteor/meteor";
import React from "react";

import expect from "expect";
import { mount } from "enzyme";
import { shallow } from "enzyme";

import { NoteList } from "./NoteList";

const notes = [
    {
        _id: "TestNote1__id",
        title: "TestNote1__title",
        body: "TestNote1__body",
        updatedAt: 0,
        userId: "TestNote1__userId"
    }, {
        _id: "TestNote2__id",
        title: "TestNote2__title",
        body: "TestNote2__body",
        updatedAt: 0,
        userId: "TestNote2__userId"
    }
];

if (Meteor.isClient) {
    describe("NoteList", function () {

        it("should render <NoteListItem/> for each note", function () {
            const wrapper = mount( <NoteList notes={notes}/> );
            expect(wrapper.find("NoteListItem").length).toBe(2);
            expect(wrapper.find("NoteListEmptyItem").length).toBe(0);
        });

        it("should render NoteListEmptyItem if no notes", function () {
            const wrapper = mount( <NoteList notes={[]}/> );
            expect(wrapper.find("NoteListEmptyItem").length).toBe(1);
            expect(wrapper.find("NoteListItem").length).toBe(0);
        });

    });
}
