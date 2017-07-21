import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";

import React from "react";
import { Router, Route, browserHistory } from "react-router";

import Signup from "./../ui/Signup";
import Dashboard from "./../ui/Dashboard";
import NotFound from "./../ui/NotFound";
import Login from "./../ui/Login";

const onEnterNotePage = (nextState) => {
    Session.set("selectedNoteId", nextState.params.id);
};

const onLeaveNotePage = (nextState) => {
    Session.set("selectedNoteId", undefined);
};

export let onAuthChange = (isAuthenticated, currentPagePrivacy) => {
    const isUnauthenticatedPage = currentPagePrivacy === "unauth";
    const isAuthenticatedPage = currentPagePrivacy === "auth";

    if (isAuthenticated && isUnauthenticatedPage) {
        browserHistory.replace("/dashboard");
    } else if (!isAuthenticated && isAuthenticatedPage) {
        browserHistory.replace("/");
    }
};
export const globalOnChange = (prevState, nextState) => {
    globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
    const lastRoute = nextState.routes[nextState.routes.length - 1];
    Session.set("currentPagePrivacy", lastRoute.privacy);
};
export let routes = (
    <Router history={browserHistory}>
        <Route onEnter={globalOnEnter} onChange={globalOnChange}>
            <Route path="/" component={Login} privacy="unauth"/>
            <Route path="/signup" component={Signup} privacy="unauth"/>
            <Route path="/dashboard" component={Dashboard} privacy="auth"/>
            <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
);
