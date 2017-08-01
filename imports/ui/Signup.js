import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";

import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import Transition from "react-easy-transition";

export class Signup extends React.Component {
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

        if (password.length < 9) {
            return this.setState({error: "Password must be atleast 9 characters long."});
        }

        this.props.createUser({email, password}, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ""});
            }
        });

        // this.setState({
        //     error: "Something went wrong i guess ?? xdf"
        // })
    }
    render() {
        return (
            <Transition
                path={location.pathname}
                initialStyle={{
                    opacity: 0,
                    transform: "scale(1.2)",
                    overflow: "hidden"
                }}
                transition="all .8s ease"
                finalStyle={{
                    opacity: 1,
                    transform: "scale(1)"
                }}>
                <div className="boxed-view">
                    <div className="boxed-view__box">
                        <h1>Sign up</h1>

                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                            <input type="email" ref="email" name="email" placeholder="Email"/>
                            <input type="password" ref="password" name="password" placeholder="Password"></input>
                            <button className="button">Create Account</button>
                        </form>

                        <Link to="/" className="boxed-view__redirect">Have an account?</Link>
                    </div>
                </div>
            </Transition>
        )
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        createUser: Accounts.createUser
    }
}, Signup);
