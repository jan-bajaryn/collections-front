import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {defaultImage} from "./Collections";
import CreateCollection from "./CreateCollection";
import CreateItem from "../components/CreateItem";

class ShowCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {collection: {}}
    }

    componentDidMount() {
        axios.get("http://localhost:8080/collection/" + this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                this.setState({collection: res.data})
            })
    }


    render() {
        let items = this.state.collection.rowNames;
        return (
            <div>
                <div className="card mt-5 w-50 container">
                    {this.state.collection.image != null ?
                        <img className="card-img-top" src={this.state.collection.image} alt="Card image cap"/>
                        :
                        <img className="card-img-top" src={defaultImage} alt="Card image cap"/>
                    }
                    <div className="card-body">
                        <h5 className="card-title">{this.state.collection.name}</h5>
                        <p className="card-text">{this.state.collection.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        {
                            this.state.collection.author != null &&
                            <li className="list-group-item">
                                <Link to={"/users/" + this.state.collection.author.id}>Author</Link>
                            </li>
                        }
                        {
                            this.state.collection.theme != null &&
                            <li className="list-group-item">
                                Theme: {this.state.collection.theme.name}
                            </li>
                        }
                        {
                            items != null &&
                            <li className="list-group-item">
                                Available additional columns:
                                <ul>
                                    {
                                        items.map(item => (
                                            <li>
                                                {item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </li>
                        }
                    </ul>
                    <div className="card-body">
                        <button className={"btn text-primary card-link"}>Create new item</button>
                    </div>
                </div>
                <CreateItem collection_id={this.state.collection.id}/>
            </div>
        );
    }
}

export default withRouter(ShowCollection);