import { Meteor } from "meteor/meteor";
import React from "react";

import expect from "expect";
import { mount } from "enzyme";

import { NoteListHeader } from "./NoteListHeader";
import { notes } from "./../fixtures/fixtures";

if (Meteor.isClient) {
    describe("NoteListHeader", function () {

        let meteorCall;
        let Session;

        beforeEach(() => {
            meteorCall = expect.createSpy();
            Session = {
                set: expect.createSpy()
            }
        });

        it("should call meteorCall and Session.set with proper arguments", function () {
            const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session}/> )
            wrapper.find("button").simulate("click");
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

            expect(meteorCall.calls[0].arguments[0]).toBe("notes.insert");
            expect(Session.set).toHaveBeenCalledWith("selectedNoteId", notes[0]._id);
        });

        it("should not call Session if error provided inside callback function", function () {
            const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session}/> )
            wrapper.find("button").simulate("click");
            meteorCall.calls[0].arguments[1]("this is error", undefined);

            expect(meteorCall.calls[0].arguments[0]).toBe("notes.insert");
            expect(Session.set).toNotHaveBeenCalled();
        });

    });
}
