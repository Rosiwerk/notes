import { Meteor } from "meteor/meteor";

import React from "react";
import expect from "expect";
import { mount } from "enzyme";

import { PrivateHeader } from "./PrivateHeader";

if (Meteor.isClient) {
    describe("PrivateHeader", function () {

        it("should set button text to Logout", function () {
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )

            const buttonText = wrapper.find("button").text();
            expect(buttonText).toBe("Logout");
        });

        it("should set title text to Test title", function () {
            const wrapper = mount ( <PrivateHeader title="Test title" handleLogout={() => {}}/> );

            const headerText = wrapper.find("h1").text();
            expect(headerText).toBe("Test title");
        });

        it("should call handleLogout on click", function () {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={spy}/>)

            wrapper.find("button").simulate("click");
            expect(spy).toHaveBeenCalled();
        });

    });
}
