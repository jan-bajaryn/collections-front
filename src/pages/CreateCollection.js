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

        this.state = {
            themes: [],
            files: [],
            bools: [''],
            integers: [''],
            strings: [''],
            texts: [''],
            dates: ['']
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    createBools() {
        return this.state.bools.map((el, i) =>
            <div className="form-group" key={i}>
                <label>Enter Name for bool column:
                    <input type="text" className="form-control" placeholder="Bool column"
                           name="bool1" value={el || ''} onChange={this.handleChangebools.bind(this, i)}/>
                </label>
                <button className={"btn btn-primary ml-2"} onClick={this.removeClickbools.bind(this, i)}>
                    Remove
                </button>
            </div>
        )
    }

    createDates() {
        return this.state.dates.map((el, i) =>
            <div className="form-group" key={i}>
                <label>Enter Name for date column:
                    <input type="text" className="form-control" placeholder="Date column"
                           name="bool1" value={el || ''} onChange={this.handleChangedates.bind(this, i)}/>
                </label>
                <button className={"btn btn-primary ml-2"} onClick={this.removeClickdates.bind(this, i)}>
                    Remove
                </button>
            </div>
        )
    }

    createInts() {
        return this.state.integers.map((el, i) =>
            <div className="form-group" key={i}>
                <label>Enter Name for integer column:
                    <input type="text" className="form-control" placeholder="Integer column"
                           name="bool1" value={el || ''} onChange={this.handleChangeintegers.bind(this, i)}/>
                </label>
                <button className={"btn btn-primary ml-2"} onClick={this.removeClickintegers.bind(this, i)}>
                    Remove
                </button>
            </div>
        )
    }

    createStrings() {
        return this.state.strings.map((el, i) =>
            <div className="form-group" key={i}>
                <label>Enter Name for string column:
                    <input type="text" className="form-control" placeholder="String column"
                           name="bool1" value={el || ''} onChange={this.handleChangestrings.bind(this, i)}/>
                </label>
                <button className={"btn btn-primary ml-2"} onClick={this.removeClickstrings.bind(this, i)}>
                    Remove
                </button>
            </div>
        )
    }

    createTexts() {
        return this.state.texts.map((el, i) =>
            <div className="form-group" key={i}>
                <label>Enter Name for text column :
                    <input type="text" className="form-control" placeholder="Text column"
                           name="bool1" value={el || ''} onChange={this.handleChangetexts.bind(this, i)}/>
                </label>
                <button className={"btn btn-primary ml-2"} onClick={this.removeClicktexts.bind(this, i)}>
                    Remove
                </button>
            </div>
        )
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const user_object = {
            name: this.name.current.value,
            description: this.description.current.value,
            themeId: this.theme.current.value,
            boolFieldNames: this.state.bools.filter(c => c!==''),
            dateFieldNames: this.state.dates.filter(c => c!==''),
            intFieldNames: this.state.integers.filter(c => c!==''),
            stringFieldNames: this.state.strings.filter(c => c!==''),
            textFieldNames: this.state.texts.filter(c => c!=='')
        }
        axios.post("http://localhost:8080/collection/create", user_object).then(res => {
            if (res.data) {
                this.props.history.push("/all-collections");
            }
        });
    }

    componentDidMount() {
        axios.get("http://localhost:8080/all-themes")
            .then(res => {
                this.setState({themes: res.data})
            })
    }

    handleChangeFiles(files) {
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

                    {this.createInts()}
                    <div>
                        <button className={"btn btn-primary"} onClick={this.addClickintegers.bind(this)}>
                            Add more
                        </button>
                    </div>
                    {this.createStrings()}
                    <div>
                        <button className={"btn btn-primary"} onClick={this.addClickstrings.bind(this)}>
                            Add more
                        </button>
                    </div>
                    {this.createBools()}
                    <div>
                        <button className={"btn btn-primary"} onClick={this.addClickbools.bind(this)}>
                            Add more
                        </button>
                    </div>
                    {this.createTexts()}
                    <div>
                        <button className={"btn btn-primary"} onClick={this.addClicktexts.bind(this)}>
                            Add more
                        </button>
                    </div>
                    {this.createDates()}
                    <div>
                        <button className={"btn btn-primary"} onClick={this.addClickdates.bind(this)}>
                            Add more
                        </button>
                    </div>

                    <div className={"my-5"}>
                        <DropzoneArea
                            onChange={this.handleChangeFiles.bind(this)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        );
    }

    handleChangebools(i, event) {
        let values = [...this.state.bools];
        values[i] = event.target.value;
        this.setState({bools: values});
    }

    handleChangedates(i, event) {
        let values = [...this.state.dates];
        values[i] = event.target.value;
        this.setState({dates: values});
    }

    handleChangeintegers(i, event) {
        let values = [...this.state.integers];
        values[i] = event.target.value;
        this.setState({integers: values});
    }

    handleChangetexts(i, event) {
        let values = [...this.state.texts];
        values[i] = event.target.value;
        this.setState({texts: values});
    }

    handleChangestrings(i, event) {
        let values = [...this.state.strings];
        values[i] = event.target.value;
        this.setState({strings: values});
    }


    addClickbools(event) {
        event.preventDefault();
        this.setState(prevState => ({bools: [...prevState.bools, '']}))
    }

    addClickdates(event) {
        event.preventDefault();
        this.setState(prevState => ({dates: [...prevState.dates, '']}))
    }

    addClicktexts(event) {
        event.preventDefault();
        this.setState(prevState => ({texts: [...prevState.texts, '']}))
    }

    addClickstrings(event) {
        event.preventDefault();
        this.setState(prevState => ({strings: [...prevState.strings, '']}))
    }

    addClickintegers(event) {
        event.preventDefault();
        this.setState(prevState => ({integers: [...prevState.integers, '']}))
    }


    removeClickdates(i) {
        let values = [...this.state.dates];
        values.splice(i, 1);
        this.setState({dates: values});
    }

    removeClickstrings(i) {
        let values = [...this.state.strings];
        values.splice(i, 1);
        this.setState({strings: values});
    }

    removeClicktexts(i) {
        let values = [...this.state.texts];
        values.splice(i, 1);
        this.setState({texts: values});
    }

    removeClickbools(i) {
        let values = [...this.state.bools];
        values.splice(i, 1);
        this.setState({bools: values});
    }

    removeClickintegers(i) {
        let values = [...this.state.integers];
        values.splice(i, 1);
        this.setState({integers: values});
    }

}

export default withRouter(CreateCollection);