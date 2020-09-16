import React from 'react';
import ReactDOM from 'react-dom';
import {WithContext as ReactTags} from 'react-tag-input';
import axios from "axios";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class CreateItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            bools: [],
            integers: [],
            dates: [],
            strings: [],
            texts: [],
            collectionId: props.collectionId,
            tags: [
                {id: "Thailand", text: "Thailand"},
                {id: "India", text: "India"}
            ],
            suggestions: [
                {id: 'USA', text: 'USA'},
                {id: 'Germany', text: 'Germany'},
                {id: 'Austria', text: 'Austria'},
                {id: 'Costa Rica', text: 'Costa Rica'},
                {id: 'Sri Lanka', text: 'Sri Lanka'},
                {id: 'Thailand', text: 'Thailand'}
            ]
        };

        this.name = React.createRef();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8080/collection/columns/" + this.state.collectionId).then(res => {
            console.log("info res.data = ", res.data)
            this.setState({
                bools: res.data.boolFieldNames.map(el => {
                    return {key: el.id, value: false, name: el.name}
                })
            })
            this.setState({
                dates: res.data.dateFieldNames.map(el => {
                    return {key: el.id, value: '', name: el.name}
                })
            })
            this.setState({
                integers: res.data.intFieldNames.map(el => {
                    return {key: el.id, value: '', name: el.name}
                })
            })
            this.setState({
                strings: res.data.stringFieldNames.map(el => {
                    return {key: el.id, value: '', name: el.name}
                })
            })
            this.setState({
                texts: res.data.textFieldNames.map(el => {
                    return {key: el.id, value: '', name: el.name}
                })
            })
            this.setState({ready: true})
        });
    }

    handleDelete(i) {
        const {tags} = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({tags: [...state.tags, tag]}));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({tags: newTags});
    }

    render() {


        const {tags, suggestions} = this.state;
        return (
            <div className={"my-5"}>
                <h3>Create new item</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" ref={this.name}/>
                    </div>

                    <div className={"my-3 form-group"}>
                        <ReactTags
                            tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters}
                            className="form-control"/>
                    </div>
                    {
                        this.state.ready &&
                        <div>
                            {this.boolColumns()}
                            {this.integerColumns()}
                            {this.dateColumns()}
                            {this.stringColumns()}
                            {this.textColumns()}
                        </div>
                    }

                    <button type="submit" className="btn btn-primary btn-block"
                            onSubmit={this.handleSubmit.bind(this)}>Submit
                    </button>
                </form>
            </div>
        )
    }

    toMap(input) {
        return input.map((el) => {
            return {nameId: el.key, value: el.value};
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
            collectionId: this.state.collectionId,
            name: this.name.current.value,
            tags: this.state.tags.map((el) => {
                return el.id
            }),
            intFields: this.toMap(this.state.integers),
            // intFields: new Map([{1: 2}, {2: 3}]),
            boolFields: this.toMap(this.state.bools),
            dateFields: this.toMap(this.state.dates),
            stringFields: this.toMap(this.state.strings),
            textFields: this.toMap(this.state.texts)
        };
        console.log("data = ", data);
        axios.post("http://localhost:8080/item/create",
            data
        ).then(res => {
            console.log("res.data = ", res.data)
            if (res.data) {
                alert("Success");
                // window.location.reload(false);
            }
        });
    }

    boolColumns() {
        return <>
            {
                this.state.bools.map((el, i) =>
                    <div className={"form-group"} key={i}>
                        <label>
                            <input className={"mx-2"} type="checkbox" name={el.name}
                                   checked={el.value} onChange={this.boolChange.bind(this, i)}/>
                            : {el.name}
                        </label>
                    </div>
                )
            }
        </>;
    }

    boolChange(i, event) {
        let values = [...this.state.bools];
        values[i].value = event.target.checked;
        this.setState({bools: values});
    }

    integerColumns() {
        return <>
            {
                this.state.integers.map((el, i) =>
                    <div className={"form-group"} key={i}>
                        <label>{el.name} :
                            <input className="form-control" placeholder="Enter number" type="number" name={el.name}
                                   value={el.value} onChange={this.integersChange.bind(this, i)}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    integersChange(i, event) {
        let values = [...this.state.integers];
        values[i].value = event.target.value;
        this.setState({integers: values});
    }

    dateColumns() {
        return <>
            {
                this.state.dates.map((el, i) =>
                    <div className={"form-group"} key={i}>
                        <label>{el.name} :
                            <input className="form-control" placeholder="Enter date" type={"datetime-local"}
                                   name={el.name} value={el.value} onChange={this.datesChange.bind(this, i)}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    datesChange(i, event) {
        let values = [...this.state.dates];
        values[i].value = event.target.value;
        this.setState({dates: values});
    }

    stringColumns() {
        return <>
            {
                this.state.strings.map((el, i) =>
                    <div className={"form-group"} key={i}>
                        <label>{el.name} :
                            <input className="form-control" placeholder="Enter text" type="text" name={el.name}
                                   value={el.value} onChange={this.stringsChange.bind(this, i)}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    stringsChange(i, event) {
        let values = [...this.state.strings];
        values[i].value = event.target.value;
        this.setState({strings: values});
    }

    textColumns() {
        return <>
            {
                this.state.texts.map((el, i) =>
                    <div className={"form-group"} key={i}>
                        <label>{el.name} :
                            <textarea placeholder="Enter text" className="form-control" rows="5" name={el.name}
                                      value={el.value} onChange={this.textChange.bind(this, i)}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    textChange(i, event) {
        let values = [...this.state.texts];
        values[i].value = event.target.value;
        this.setState({texts: values});
    }

}

export default CreateItem;