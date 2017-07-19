import { Meteor } from "meteor/meteor";

import expect from "expect";

import { validateNewUser } from "./users";

if (Meteor.isServer) {
    describe("users", function () {

        it("should return true for valid email", function () {
            const testUser = {
                emails: [
                    {
                        address: "rosiwerk@gmail.com"
                    }
                ]
            };

            const res = validateNewUser(testUser);
            expect(res).toBe(true);
        });

        it("should should throw error for invalid email", function() {
            const testUser = {
                emails: [
                    {
                        address: "hahaha"
                    }
                ]
            }

            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });

    });
}
