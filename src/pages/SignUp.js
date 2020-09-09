import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
import * as axios from "axios";

import {Redirect} from "react-router-dom";

import {useHistory} from "react-router-dom";
import MyRedirect from "../utils/MyRedirect";

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fstPass: "",
            secPass: "",
            email: "",
            name: "",
            allowSend: false,
            error: false,
            redirect: false
        };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.handleChangeFstPass = this.handleChangeFstPass.bind(this);
        this.handleChangeSecPass = this.handleChangeSecPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;

        console.log("nam = ", nam)
        console.log("val = ", val)

        this.setState({[nam]: val});
    }


    render() {
        return (
            <div className={"container mt-5 pt-5 h-100"}>
                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign Up</h3>

                        {
                            this.state.error &&
                            <div className={"text-danger"}>
                                Some error there there
                            </div>
                        }

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email"
                                   value={this.state.email} onChange={this.myChangeHandler} name={"email"}/>
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
                            <input type="text" className="form-control" placeholder="Enter name"
                                   value={this.state.name} onChange={this.myChangeHandler} name={"name"}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block"
                                disabled={this.state.allowSend}>
                            Submit
                        </button>
                        <p className="forgot-password text-right mt-1">
                            <Link to={"/sign-up"}>Forgot password?</Link>
                        </p>
                    </form>
                    {
                        this.state.redirect &&
                        <Redirect to={"/all-collections"}/>
                    }
                </div>
            </div>
        );

    };

    handleChangeFstPass(event) {
        this.setState({fstPass: event.target.value});
        if (this.state.fstPass !== this.state.secPass) {
            this.setState({allowSend: false})
        } else {
            this.setState({allowSend: true})
        }
    }

    validateForm() {
        console.log("name = ", this.state.name)
        console.log("email = ", this.state.email)
        console.log("fstPass = ", this.state.fstPass)
        console.log("secPass = ", this.state.secPass)

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
            console.log(5)
        }
        event.preventDefault();
    }

    sendData() {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.fstPass,
        }
        console.log("before send", data)
        axios
            .post("http://localhost:8080/sign-up", data)
            .then(data => {
                if (data.error) {
                    this.setState({error: true})
                    console.log("2")
                } else {
                    this.setState({redirect: true})
                }
            })
            .catch(error => {
                this.setState({error: true})
            });
    }
}