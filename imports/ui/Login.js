import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import Transition from "react-easy-transition";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }
    onSubmit(event) {
        event.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        this.props.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: "Unable to login. Check email and password."});
            } else {
                this.setState({error: ""});
            }
        });
    }
    render() {
        return (
            <Transition
                path={location.pathname}
                initialStyle={{
                    opacity: 0,
                    transform: "scale(1.2)"
                }}
                transition="all .8s ease"
                finalStyle={{
                    opacity: 1,
                    transform: "scale(1)"
                }}>
                <div className="boxed-view">
                    <div className="boxed-view__box">
                        <h1>Login</h1>

                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                            <input type="email" ref="email" name="email" placeholder="Email"/>
                            <input type="password" ref="password" name="password" placeholder="Password"></input>
                            <button className="button">Login</button>
                        </form>

                        <Link className="boxed-view__redirect" to="/signup">Need an account?</Link>
                    </div>
                </div>
            </Transition>
        )
    }
}

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        loginWithPassword: Meteor.loginWithPassword
    }
}, Login);
