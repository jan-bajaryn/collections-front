import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";

class Collections extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []

        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/all-collections")
            .then(res => {
                this.setState({error: false, isLoaded: true, items: res.data})
            })
    }

    render() {
        return (
            <div className={"container"}>
                <Typography component={"h1"} className={"mt-5 pt-5"}>
                    Collections:
                </Typography>

                <div className={"m-5 p-5 row"}>
                    {this.state.items.map(item => (
                        <div className="card w-25 h-10 col-3 mr-1 mb-1">
                            <img className="card-img-top" src={item.image} alt={"Card top image"}/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <Button component={Link} to={"/item/" + item.id}>
                                    See
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <Typography component={"div"} className={"mx-5 px-5"}>
                    <Link to={"/collection/create"} className={"text-white dec-none"}>
                        <button className={"btn btn-primary btn-block"}>
                            Create new
                        </button>
                    </Link>
                </Typography>
            </div>
        );
    }
}

export default Collections;