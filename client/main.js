import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

import React from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";

import Dashboard from "./../imports/ui/Dashboard";
import LoadingScreen from "./../imports/ui/loading/LoadingScreen";

import { Notes } from "./../imports/api/notes";
import { routes, onAuthChange } from "./../imports/routes/routes";
import "../imports/startup/simple-schema-configuration.js";

import $ from "jquery";

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const currentPagePrivacy = Session.get("currentPagePrivacy");

    onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get("selectedNoteId");
    Session.set("isNavOpen", false);

    if (selectedNoteId) {
        browserHistory.replace(`/dashboard/${selectedNoteId}`);
    }
});

Tracker.autorun(() => {
    const isNavOpen = Session.get("isNavOpen");

    document.body.classList.toggle("is-nav-open", isNavOpen);
});

Meteor.startup(() => {
    Session.set("selectedNoteId", undefined);
    Session.set("isNavOpen", false);

    $("body").click(function(event) {
        if (
            event.target.class === "page-content" ||
            event.target.class === "private-header" ||
            event.target.class === "confirm-modal__overlay"
        )
            return;

        if (
            $(event.target).closest(".page-content").length ||
            $(event.target).closest(".private-header").length ||
            $(event.target).closest(".confirm-modal__overlay").length
        )
            return;

        Session.set("selectedNoteId", undefined);
    });

    Tracker.autorun(() => {
        // ReactDOM.render(<LoadingScreen/>, document.getElementById("app"));
        // ReactDOM.render(routes, document.getElementById("app"));

        if (Meteor.user() === undefined) {
            setTimeout(() => {
                ReactDOM.render(<LoadingScreen/>, document.getElementById("app"));
            }, 200);
        } else {
            ReactDOM.render(routes, document.getElementById("app"));
        }
    });
});
