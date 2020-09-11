import React, {Component} from 'react';

class Logout extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear();
        window.location.href = "/";
    }

    render() {
        return (
            <div>
                <button className={"btn btn-secondary ml-5"} onClick={this.handleLogout}>
                    Log out
                </button>
            </div>
        );
    }
}

export default Logout;