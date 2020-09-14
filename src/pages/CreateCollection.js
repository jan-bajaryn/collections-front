import React, {Component, createRef} from 'react';
import {DropzoneArea} from "material-ui-dropzone";
import axios from "axios";
import {withRouter} from "react-router-dom";


class CreateCollection extends Component {

    constructor(props) {
        super(props);

        this.name = createRef()
        this.description = React.createRef()
        this.theme = React.createRef()
        this.bool1Name = React.createRef()
        this.bool2Name = React.createRef()
        this.bool3Name = React.createRef()
        this.int1Name = React.createRef()
        this.int2Name = React.createRef()
        this.int3Name = React.createRef()
        this.string1Name = React.createRef()
        this.string2Name = React.createRef()
        this.string3Name = React.createRef()
        this.text1Name = React.createRef()
        this.text2Name = React.createRef()
        this.text3Name = React.createRef()
        this.date1Name = React.createRef()
        this.date2Name = React.createRef()
        this.date3Name = React.createRef()

        this.state = {
            themes: [],
            files: []
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();

        console.log("begin")
        const user_object = {
            name: this.name.current.value,
            description: this.description.current.value,
            themeId: this.theme.current.value,
            bool1Name: this.bool1Name.current.value,
            bool2Name: this.bool2Name.current.value,
            bool3Name: this.bool3Name.current.value,
            int1Name: this.int1Name.current.value,
            int2Name: this.int2Name.current.value,
            int3Name: this.int3Name.current.value,
            string1Name: this.string1Name.current.value,
            string2Name: this.string2Name.current.value,
            string3Name: this.string3Name.current.value,
            text1Name: this.text1Name.current.value,
            text2Name: this.text2Name.current.value,
            text3Name: this.text3Name.current.value,
            date1Name: this.date1Name.current.value,
            date2Name: this.date2Name.current.value,
            date3Name: this.date3Name.current.value
        }
        console.log("end1")
        axios.post("http://localhost:8080/collection/create", user_object).then(res => {
            console.log(res)
            // console.log(res.data);
            if (res.data) {
                this.props.history.push("/all-collections");
            }
        });
        console.log("end2")
    }

    componentDidMount() {
        axios.get("http://localhost:8080/all-themes")
            .then(res => {
                this.setState({themes: res.data})
            })
    }

    handleChange(files) {
        this.setState({
            files: files
        });
    }


    render() {
        return (
            <div className={"mt-5 pt-5 container"}>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Enter Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Name" name="name"
                               ref={this.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea className="form-control" rows="5" id="description" name={"description"}
                                  ref={this.description}/>
                    </div>

                    <div className={"form-group"}>
                        <select className="form-control" ref={this.theme}>
                            {
                                this.state.themes.map(thm => (
                                    <option value={thm.id} key={thm.id}>
                                        {thm.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="int1">Enter Name for integer column 1:</label>
                        <input type="text" className="form-control" id="int1" placeholder="Integer 1 value"
                               name="int1" ref={this.int1Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="int2">Enter Name for integer column 2:</label>
                        <input type="text" className="form-control" id="int2" placeholder="Integer 2 value"
                               name="int2" ref={this.int2Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="int3">Enter Name for integer column 3:</label>
                        <input type="text" className="form-control" id="int3" placeholder="Integer 3 value"
                               name="int3" ref={this.int3Name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="string1">Enter Name for string column 1:</label>
                        <input type="text" className="form-control" id="string1" placeholder="string 1 value"
                               name="string1" ref={this.string1Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="string2">Enter Name for string column 2:</label>
                        <input type="text" className="form-control" id="string2" placeholder="string 2 value"
                               name="string2" ref={this.string2Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="string3">Enter Name for string column 3:</label>
                        <input type="text" className="form-control" id="string3" placeholder="string 3 value"
                               name="string3" ref={this.string3Name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bool1">Enter Name for bool column 1:</label>
                        <input type="text" className="form-control" id="bool1" placeholder="bool 1 value"
                               name="bool1" ref={this.bool1Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bool2">Enter Name for bool column 2:</label>
                        <input type="text" className="form-control" id="bool2" placeholder="bool 2 value"
                               name="bool2" ref={this.bool2Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bool3">Enter Name for bool column 3:</label>
                        <input type="text" className="form-control" id="bool3" placeholder="bool 3 value"
                               name="bool3" ref={this.bool3Name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text1">Enter Name for text column 1:</label>
                        <input type="text" className="form-control" id="text1" placeholder="text 1 value"
                               name="text1" ref={this.text1Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text2">Enter Name for text column 2:</label>
                        <input type="text" className="form-control" id="text2" placeholder="text 2 value"
                               name="text2" ref={this.text2Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text3">Enter Name for text column 3:</label>
                        <input type="text" className="form-control" id="text3" placeholder="text 3 value"
                               name="text3" ref={this.text3Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date1">Enter Name for date column 1:</label>
                        <input type="text" className="form-control" id="date1" placeholder="date 1 value"
                               name="date1" ref={this.date1Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date2">Enter Name for date column 2:</label>
                        <input type="text" className="form-control" id="date2" placeholder="date 2 value"
                               name="date2" ref={this.date2Name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date3">Enter Name for date column 3:</label>
                        <input type="text" className="form-control" id="date3" placeholder="date 3 value"
                               name="date3" ref={this.date3Name}/>
                    </div>
                    <div className={"my-5"}>
                        <DropzoneArea
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateCollection);