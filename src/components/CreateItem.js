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
            collectionId: props.collectionId,
            info: null,
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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8080/collection/columns/" + this.state.collectionId).then(res => {
            console.log("info res.data = ", res.data)
            this.setState({info: res.data})
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
                <form>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter email" ref={this.username}/>
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
                        this.state.info != null &&
                        <div>
                            {this.boolColumns()}
                            {this.integerColumns()}
                            {this.dateColumns()}
                            {this.stringColumns()}
                            {this.textColumns()}
                        </div>
                    }

                    <button type="submit" className="btn btn-primary btn-block"
                            onSubmit={this.handleSubmit}>Submit
                    </button>
                </form>
            </div>
        )
    }

    boolColumns() {
        return <>
            {
                this.state.info.boolFieldNames.map(el =>
                    <div className={"form-group"}>
                        <label>
                            <input className={"mx-2"} type="checkbox" name={el.name}/>
                            : {el.name}
                        </label>
                    </div>
                )
            }
        </>;
    }

    integerColumns() {
        return <>
            {
                this.state.info.intFieldNames.map(el =>
                    <div className={"form-group"}>
                        <label>{el.name} :
                            <input className="form-control" placeholder="Enter number" type="number" name={el.name}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    dateColumns() {
        return <>
            {
                this.state.info.dateFieldNames.map(el =>
                    <div className={"form-group"}>
                        <label>{el.name} :
                            <input className="form-control" placeholder="Enter date" type={"datetime-local"} name={el.name}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    stringColumns() {
        return <>
            {
                this.state.info.stringFieldNames.map(el =>
                    <div className={"form-group"}>
                        <label>{el.name} :
                            <input className="form-control" placeholder="Enter text" type="text" name={el.name}/>
                        </label>
                    </div>
                )
            }
        </>;
    }

    textColumns() {
        return <>
            {
                this.state.info.textFieldNames.map(el =>
                    <div className={"form-group"}>
                        <label>{el.name} :
                            <textarea placeholder="Enter text" className="form-control" rows="5" name={el.name}/>
                        </label>
                    </div>
                )
            }
        </>;
    }
}

export default CreateItem;