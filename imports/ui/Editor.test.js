import { Meteor } from "meteor/meteor";
import React from "react";

import expect from "expect";
import { mount } from "enzyme";

import { notes } from "./../fixtures/fixtures";
import { Editor } from "./Editor";

if (Meteor.isClient) {
    describe("Editor", function () {

        let call;
        let browserHistory;

        beforeEach(() => {
            call = expect.createSpy();
            browserHistory = {
                replace: expect.createSpy()
            };
        });

        it("should render note not found paragraph", function () {
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory} selectedNoteId="thatDoesNotExist"/>);
            expect(wrapper.find("p").text()).toBe("Note not found.");
        });

        it("should render pick or create note to get started paragraph", function () {
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory}/> );
            expect(wrapper.find("p").text()).toBe("Pick or create note to get started.");
        });

        it("should call notes.remove", function () {
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id}/> );
            wrapper.find("button").simulate("click");

            expect(call).toHaveBeenCalledWith("notes.remove", notes[0]._id);
            expect(browserHistory.replace).toHaveBeenCalledWith("/dashboard");
        });

        it("should update note body on textarea change", function () {
            const newBody = "newNoteBody1"
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id}/> );
            wrapper.find("textarea").simulate("change", {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state("body")).toBe(newBody);
            expect(call).toHaveBeenCalledWith("notes.update", notes[0]._id, { body: newBody });
        });

        it("should update note title on input change", function () {
            const newTitle = "newNoteTitle1"
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory} note={notes[0]} selectedNoteId={notes[0]._id}/> );
            wrapper.find("input").simulate("change", {
                target: {
                    value: newTitle
                }
            });

            expect(wrapper.state("title")).toBe(newTitle);
            expect(call).toHaveBeenCalledWith("notes.update", notes[0]._id, { title: newTitle });
        });

        it("should set state for new note", function () {
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory}/> );
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            });

            expect(wrapper.state("title")).toBe(notes[0].title);
            expect(wrapper.state("body")).toBe(notes[0].body);
        });

        it("should not set state if note prop not provided", function () {
            const wrapper = mount( <Editor call={call} browserHistory={browserHistory}/> );
            wrapper.setProps({
                selectedNoteId: notes[0]._id
            });

            expect(wrapper.state("title")).toBe("");
            expect(wrapper.state("body")).toBe("");
        });

    });
}
