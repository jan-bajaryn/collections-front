import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {Link, Route, withRouter} from "react-router-dom";
import axios from "axios";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.username = React.createRef();
        this.password = React.createRef();

        this.state = {error: false}

    }


    handleFormSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8080/authenticate";
        const username = this.username.current.value;
        const password = this.password.current.value;
        const user_object = {
            username: username,
            password: password
        };
        axios.post(endpoint, user_object).then(res => {
            localStorage.setItem("authorization", res.data.token);
            console.log("Authorities = ", res.data.authorities)
            console.log("Authority = ", res.data.authorities[0])
            localStorage.setItem("role", res.data.authorities[0])
            console.log("Role = ", localStorage.getItem("role"))
            return this.handleDashboard();
        });
    };

    handleDashboard() {
        axios.get("http://localhost:8080/dashboard").then(res => {
            if (res.data === "success") {
                this.props.history.push("/all-collections");
            } else {
                alert("Authentication failure");
            }
        });
    }


    render() {
        return (
            <div className={"container mt-5 pt-5 h-100"}>
                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleFormSubmit}>
                        <h3>Sign In</h3>

                        {
                            this.state.error &&
                            <div className={"text-danger"}>Authentication error</div>
                        }

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter email" ref={this.username}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                   ref={this.password}/>
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block"
                                onSubmit={this.handleSubmit}>Submit
                        </button>
                        <p className="forgot-password text-right mt-1">
                            <Link to={"/sign-up"}>Forgot password?</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);