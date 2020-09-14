import React, {Component} from 'react';
import axios from "axios";

class Item extends Component {

    constructor(props) {
        super(props);

        this.state = {id: props.id};
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Item;