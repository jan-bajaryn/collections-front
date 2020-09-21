import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class AllItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionId: props.collectionId,
            items: null
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/collection/items/" + this.state.collectionId)
            .then(res => {
                console.log(res.data)
                this.setState({items: res.data})
            })
    }


    render() {
        return (
            <div>
                {
                    this.state.items !== null &&
                    <div className={"container my-5"}>
                        <h3 className={"mb-4"}>Items</h3>
                        <ol>
                            {
                                this.state.items.map((value, index) => (
                                    <li key={index}>
                                        <div className="card w-10">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <Link to={"/item/" + value.id}>
                                                        {value.name}
                                                    </Link>
                                                </h5>
                                                <h6 className="card-subtitle mb-2 text-muted">

                                                    {value.tags !== null &&
                                                    value.tags.map((el, k) => (
                                                        <span key={k}>#{el} </span>
                                                    ))
                                                    }                                            </h6>
                                                {
                                                    (value.boolFields != null ||
                                                        value.dateFields != null ||
                                                        value.intFields != null ||
                                                        value.stringFields != null ||
                                                        value.textFields != null) &&
                                                    <ul className="list-group list-group-flush">

                                                        {
                                                            value.boolFields.map((el, i) => (
                                                                <li className="list-group-item" key={i}>
                                                                    {el.name} : {el.value}
                                                                </li>
                                                            ))
                                                        }

                                                        {
                                                            value.intFields.map((el, i) => (
                                                                <li className="list-group-item" key={i}>
                                                                    {el.name} : {el.value}
                                                                </li>
                                                            ))
                                                        }
                                                        {
                                                            value.textFields.map((el, i) => (
                                                                <li className="list-group-item" key={i}>
                                                                    {el.name} : {el.value}
                                                                </li>
                                                            ))
                                                        }
                                                        {
                                                            value.stringFields.map((el, i) => (
                                                                <li className="list-group-item" key={i}>
                                                                    {el.name} : {el.value}
                                                                </li>
                                                            ))
                                                        }
                                                        {
                                                            value.dateFields.map((el, i) => (
                                                                <li className="list-group-item" key={i}>
                                                                    {el.name} : {el.value}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                    </li>

                                ))
                            }
                        </ol>
                    </div>
                }
            </div>
        );
    }
}

export default AllItems;