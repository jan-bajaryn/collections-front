import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {fstPass: "", secPass: "", allowSend: false};

        this.handleChangeFstPass = this.handleChangeFstPass.bind(this);
        this.handleChangeSecPass = this.handleChangeSecPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFstPass(event) {
        this.setState({fstPass: event.target.value});
        if (this.state.fstPass !== this.state.secPass) {
            this.setState({allowSend: false})
        }else {
            this.setState({allowSend: true})

        }
    }

    handleChangeSecPass(event) {
        this.setState({secPass: event.target.value});
        if (this.state.fstPass !== this.state.secPass) {
            this.setState({allowSend: false})
        }else {
            this.setState({allowSend: true})
        }
    }

    handleSubmit(event) {
        if (this.state.fstPass !== this.state.secPass) {
            alert("You can't send different passwords");
        }
        event.stopPropagation();
    }

    render() {
        return (
            <div className={"container mt-5 pt-5 h-100"}>
                <div className="row h-100 justify-content-center align-items-center">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign Up</h3>

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