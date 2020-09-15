import React, {Component} from 'react';

class CreateItem extends Component {

    constructor(props) {
        super(props);
        this.state = {collection_id: props.collection_id}
    }


    render() {
        return (
            <div>
                <div className="container my-5 w-50">
                    <form onSubmit={this.handleFormSubmit}>
                        <h3>Create new item</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Enter name" ref={this.name}/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block"
                                onSubmit={this.handleSubmit}>Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateItem;