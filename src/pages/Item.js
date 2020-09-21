import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {defaultImage} from "./Collections";
import axios from "axios";
import Like from "../components/Like";

class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {item: null}
    }

    componentDidMount() {
        axios.get("http://localhost:8080/item/" + this.props.match.params.id).then(res => {
            console.log(res.data)
            this.setState({item: res.data});
        });
    }

    render() {
        const item = this.state.item;
        return (
            <div className={"my-5 container"}>
                {item !== null &&
                <div className="card mt-5">
                    <div className="card-header">
                        {item.name}
                    </div>
                    {
                        item.image !== null ?
                            <img className="card-img-top" src={item.image} alt="Card image cap"/>
                            :
                            <img className="card-img-top" src={defaultImage} alt="Card image cap"/>
                    }
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <p>
                                {
                                    item.tags.map((el, index) => (
                                        <Link to={"/tag/" + el}>#{el} </Link>
                                    ))
                                }
                            </p>
                        </blockquote>
                    </div>
                    <ul className="list-group list-group-flush">

                        {
                            item.boolFields.map((el, i) => (
                                <li className="list-group-item" key={i}>
                                    {el.name} : {el.value}
                                </li>
                            ))
                        }

                        {
                            item.intFields.map((el, i) => (
                                <li className="list-group-item" key={i}>
                                    {el.name} : {el.value}
                                </li>
                            ))
                        }
                        {
                            item.textFields.map((el, i) => (
                                <li className="list-group-item" key={i}>
                                    {el.name} : {el.value}
                                </li>
                            ))
                        }
                        {
                            item.stringFields.map((el, i) => (
                                <li className="list-group-item" key={i}>
                                    {el.name} : {el.value}
                                </li>
                            ))
                        }
                        {
                            item.dateFields.map((el, i) => (
                                <li className="list-group-item" key={i}>
                                    {el.name} : {el.value}
                                </li>
                            ))
                        }
                        {/*<li className="list-group-item"><i className="far fa-heart indigo-text"/></li>*/}
                        <li className="list-group-item">
                            <Like/>
                        </li>
                        <li className="list-group-item"><Link to={"/collection/"+item.collectionId}>Back to collection</Link></li>
                    </ul>
                </div>
                }

            </div>
        );
    }
}

export default withRouter(Item);