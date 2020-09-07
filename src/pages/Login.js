import React, {useState} from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";

export default function Login() {
    return (
        <div className={"container mt-5 pt-5 h-100"}>
            <div className="row h-100 justify-content-center align-items-center">
                <form>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right mt-1">
                        <Link to={"/sign-up"}>Forgot password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}