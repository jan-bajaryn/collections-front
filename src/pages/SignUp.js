import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import * as axios from "axios";

import {useHistory} from "react-router-dom";
import {If} from "babel-plugin-jsx-control-statements";

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fstPass: "",
            secPass: "",
            email: "",
            name: "",
            allowSend: false,
            error: false
        };

        this.handleChangeFstPass = this.handleChangeFstPass.bind(this);
        this.handleChangeSecPass = this.handleChangeSecPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeFstPass(event) {
        this.setState({fstPass: event.target.value});
        if (this.state.fstPass !== this.state.secPass) {
            this.setState({allowSend: false})
        } else {
            this.setState({allowSend: true})
        }
    }

    validateForm() {
        return this.state.name !== "" &&
            this.state.email !== "" &&
            this.state.fstPass !== "" &&
            this.state.secPass !== "" &&
            this.state.fstPass === this.state.secPass;
    }

    handleChangeSecPass(event) {
        this.setState({secPass: event.target.value});
        if (this.state.fstPass !== this.state.secPass) {
            this.setState({allowSend: false})
        } else {
            this.setState({allowSend: true})
        }
    }

    handleSubmit(event) {
        if (this.validateForm()) {
            this.sendData(event);
        } else {
            this.setState({error: true})
            event.preventDefault();
        }
    }

    sendData(event) {
        const data = {
            email: this.state.email,
            password: this.state.fstPass,
            name: this.state.name,
        }

        axios
            .post("http://localhost:8080/sign-up", data)
            .then(data => {
                if (data.error) {
                    this.setState({error: true})
                    event.preventDefault();
                } else {
                    useHistory().push("/all-collections");
                }
            })
            .catch(error => {
                this.setState({error: true})
                event.preventDefault();
            });
    }

    render() {
        return (
            <div className={"container mt-5 pt-5 h-100"}>
                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign Up</h3>

                        {/*<If condition={true}>*/}
                        {/*    <span>Truth</span>*/}
                        {/*</If>;*/}

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                   value={this.state.fstPass} onChange={this.handleChangeFstPass}/>
                        </div>

                        <div className="form-group">
                            <label>Repeat Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                   value={this.state.secPass} onChange={this.handleChangeSecPass}/>
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter name"/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block"
                                disabled={this.state.allowSend}>
                            Submit
                        </button>
                        <p className="forgot-password text-right mt-1">
                            <Link to={"/sign-up"}>Forgot password?</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    };
}