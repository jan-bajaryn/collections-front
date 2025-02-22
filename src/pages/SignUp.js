import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, Redirect} from "react-router-dom";
import * as axios from "axios";

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
                        <Redirect to={"/login"}/>
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
            this.sendData();
        } else {
            this.setState({error: true})
        }
        event.preventDefault();
    }

    sendData() {
        const data = {
            username: this.state.name,
            email: this.state.email,
            password: this.state.fstPass
        };

        const headers = {"Content-Type": "application/json"};

        axios
            .post("http://localhost:8080/sign-up", data, headers)
            .then(data => {
                let result = data.data;
                if (result) {
                    this.setState({redirect: true});
                } else {
                    this.setState({error: true});
                }
            })
            .catch(error => {
                this.setState({error: true})
            });
    }
}