import { Meteor } from "meteor/meteor";
import expect from "expect";

import { Notes } from "./notes";

if (Meteor.isServer) {
    describe("notes", function () {

        const seedNoteOne = {
            _id: "seedNoteId1",
            title: "Seed Note Title",
            body: "Seed Note Body",
            updatedAt: 0,
            userId: "seedNoteUserId1"
        };

        const seedNoteTwo = {
            _id: "seedNoteId2",
            title: "Seed Note Title",
            body: "Seed Note Body",
            updatedAt: 0,
            userId: "seedNoteUserId2"
        };

        beforeEach(function () {
            Notes.remove({});
            Notes.insert(seedNoteOne);
            Notes.insert(seedNoteTwo);
        });


        it("should insert new note", function () {
            const userId = "3c5da54frs";
            const _id = Meteor.server.method_handlers["notes.insert"].apply({ userId });
            expect(Notes.findOne({_id, userId})).toExist();
        });

        it("should throw new meteor error", function () {
            expect(() => {
                Meteor.server.method_handlers["notes.insert"]();
            }).toThrow();
        });

        it("should remove note", function () {
            const _id = seedNoteOne._id;
            const userId = seedNoteOne.userId;
            Meteor.server.method_handlers["notes.remove"].apply({ userId }, [ _id ]);
            expect(Notes.findOne({ _id, userId })).toNotExist();
        });

        it("should not remove note if unauthenticated person", function() {
            const _id = seedNoteOne._id;
            expect(() => {
                Meteor.server.method_handlers["notes.remove"].apply({}, [ _id ]);
            }).toThrow();
        });

        it("should not remove note if invalid _id", function() {
            const userId = "seedNoteUserId123";
            expect(() => {
                Meteor.server.method_handlers["notes.remove"].apply({ userId });
            }).toThrow();
        });

        it("should update note", function () {
            const _id = seedNoteOne._id;
            const userId = seedNoteOne.userId;
            const updates = { title: "Title Update", body: "Body Update" };
            Meteor.server.method_handlers["notes.update"].apply({ userId }, [ _id, updates ]);
            const note = Notes.findOne({ _id });
            expect(Notes.findOne({ _id }).updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({ ...updates });
        });

        it("should throw error if extra updates provided", function () {
            const _id = seedNoteOne._id;
            const userId = seedNoteOne.userId;
            const updates = { title: "Title Update", body: "Body Update", extraUpdate: "Bad update" };
            expect(() => {
                Meteor.server.method_handlers["notes.update"].apply({ userId }, [ _id, updates ]);
            }).toThrow();
        });

        it("should not update note if user is not the creator", function () {
            const _id = seedNoteOne._id;
            const userId = "scaryMaliciousUserId";
            const updates = { title: "Title Update", body: "Body Update" };
            expect(Notes.findOne({ _id })).toInclude({ ...seedNoteOne });
        });

        it("should not update note if unauthenticated person", function() {
            const _id = seedNoteOne._id;
            const updates = { title: "Title Update", body: "Body Update" };
            expect(() => {
                Meteor.server.method_handlers["notes.remove"].apply({}, [ _id ], updates);
            }).toThrow();
        });

        it("should not update note if invalid _id", function() {
            const userId = seedNoteOne.userId;
            const updates = { title: "Title Update", body: "Body Update" };
            expect(() => {
                Meteor.server.method_handlers["notes.remove"].apply({ userId }, [ updates ]);
            }).toThrow();
        });

        it("should return a users notes", function () {
            const userId = seedNoteOne.userId;
            const res = Meteor.server.publish_handlers.notes.apply({ userId });
            const notes = res.fetch();
            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(seedNoteOne);
        });

        it("should return 0 notes for user that has none", function() {
            const userId = "Malicious user";
            const res = Meteor.server.publish_handlers.notes.apply({ userId });
            const notes = res.fetch();
            expect(notes.length).toBe(0);
        });

    });
}
