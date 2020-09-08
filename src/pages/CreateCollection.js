import React, {Component} from 'react';
import {DropzoneArea} from "material-ui-dropzone";

class CreateCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    handleChange(files) {
        this.setState({
            files: files
        });
    }


    render() {
        return (
            <div className={"mt-5 pt-5 container"}>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Enter Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Name" name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea className="form-control" rows="5" id="description"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="int1">Enter Name for integer column 1:</label>
                        <input type="text" className="form-control" id="int1" placeholder="Integer 1 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="int2">Enter Name for integer column 2:</label>
                        <input type="text" className="form-control" id="int2" placeholder="Integer 2 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="int3">Enter Name for integer column 3:</label>
                        <input type="text" className="form-control" id="int3" placeholder="Integer 3 value"
                               name="name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="string1">Enter Name for string column 1:</label>
                        <input type="text" className="form-control" id="string1" placeholder="string 1 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="string2">Enter Name for string column 2:</label>
                        <input type="text" className="form-control" id="string2" placeholder="string 2 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="string3">Enter Name for string column 3:</label>
                        <input type="text" className="form-control" id="string3" placeholder="string 3 value"
                               name="name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bool1">Enter Name for bool column 1:</label>
                        <input type="text" className="form-control" id="bool1" placeholder="bool 1 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bool2">Enter Name for bool column 2:</label>
                        <input type="text" className="form-control" id="bool2" placeholder="bool 2 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bool3">Enter Name for bool column 3:</label>
                        <input type="text" className="form-control" id="bool3" placeholder="bool 3 value"
                               name="name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text1">Enter Name for text column 1:</label>
                        <input type="text" className="form-control" id="text1" placeholder="text 1 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text2">Enter Name for text column 2:</label>
                        <input type="text" className="form-control" id="text2" placeholder="text 2 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text3">Enter Name for text column 3:</label>
                        <input type="text" className="form-control" id="text3" placeholder="text 3 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date1">Enter Name for date column 1:</label>
                        <input type="text" className="form-control" id="date1" placeholder="date 1 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date2">Enter Name for date column 2:</label>
                        <input type="text" className="form-control" id="date2" placeholder="date 2 value"
                               name="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date3">Enter Name for date column 3:</label>
                        <input type="text" className="form-control" id="date3" placeholder="date 3 value"
                               name="name"/>
                    </div>
                    <div className={"my-5"}>
                        <DropzoneArea
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default CreateCollection;