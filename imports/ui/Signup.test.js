import { Meteor } from "meteor/meteor";

import React from "react";
import expect from "expect";
import { mount } from "enzyme";

import { Signup } from "./Signup";

if (Meteor.isClient) {
    describe("Signup", function () {

        it("should show error messages", function () {
            const error = "test error";
            const wrapper = mount( <Signup createUser={() => {}}/> )

            wrapper.setState({ error });
            const errorText = wrapper.find("p").text();
            expect(errorText).toBe(error);

            wrapper.setState({ error: "" });
            expect(wrapper.find("p").length).toBe(0);
        });

        it("should call createUser with the form data", function () {
            const email = "rosiwerk@gmail.com";
            const password = "password123";
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy}/> );

            wrapper.ref("email").node.value = email;
            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it("should set error if short password", function () {
            const email = "rosiwerk@gmail.com";
            const password = "password";
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy}/> );

            wrapper.ref("email").node.value = email;
            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            expect(spy).toNotHaveBeenCalled();
            expect(wrapper.state("error").length).toNotBe(0);
        });

        it("should set createUser callback errors", function () {
            const password = "password123";
            const reason = "Reason for the error";
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy}/> );

            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state("error")).toBe("Reason for the error");

            spy.calls[0].arguments[1]();
            expect(wrapper.state("error")).toBe("");
        });

    });
}
