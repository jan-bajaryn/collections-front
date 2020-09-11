import React, {Component} from "react";
import axios from "axios";

class MyLogin extends Component {
    constructor(props) {
        super(props);

        this.usrname = React.createRef();
        this.passw = React.createRef();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8080/authenticate";

        const username = this.usrname.current.value;
        const password = this.passw.current.value;

        const user_object = {
            username: username,
            password: password
        };

        axios.post(endpoint, user_object).then(res => {
            localStorage.setItem("authorization", res.data.token);
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
            <div className={"mt-5 pt-5"}>
                <div className="wrapper">
                    <form className="form-signin" onSubmit={this.handleFormSubmit}>
                        <h2 className="form-signin-heading">Please login</h2>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="User name"
                                   ref={this.usrname}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                   className="form-control"
                                   placeholder="password"
                                   ref={this.passw}
                            />
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default MyLogin;