import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

import ReactDOM from "react-dom";
import { browserHistory } from "react-router";

import { routes, onAuthChange } from "./../imports/routes/routes";
import "../imports/startup/simple-schema-configuration.js";

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    const currentPagePrivacy = Session.get("currentPagePrivacy");

    onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get("selectedNoteId");

    if (selectedNoteId) {
        browserHistory.replace(`/dashboard/${selectedNoteId}`);
    }
});

Meteor.startup(() => {
    Session.set("selectedNoteId", undefined);
    ReactDOM.render(routes, document.getElementById("app"));
});
