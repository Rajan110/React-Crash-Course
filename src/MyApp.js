import React from 'react';
import logo from './LCO-logo-white.png';
import './MyApp.css';

class MyApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: []
        }
    }

    addItem(todoValue) {
        if (todoValue !== "") {
            const newItem = {
                id: Date.now(),
                value: todoValue,
                isDone: false
            };
            const list = [...this.state.list];
            list.push(newItem);

            this.setState({
                list: list,
                newItem: ""
            });
        }
    }

    deleteItem(id) {
        const list = [...this.state.list];
        const updatedList = list.filter(item => item.id !== id);
        this.setState({
            list: updatedList,
            newItem: ""
        })
    }

    updateInput(input) {
        this.setState({
            newItem: input
        })
    }

    updateItem(id) {
        const list = [...this.state.list];
        const updatedList = list.map(item =>
            item.id === id ? {...item, isDone: !(item.isDone)} : item
        );
        this.setState({
            list: updatedList,
            newItem: ""
        })
    }

    render() {
        return (
            <div className="App">
                <img src={logo} height={100} width={100} className="logo"/>
                <h1 className="app-title">LCO ToDo App</h1>
                <div className="container">
                    Add An Item...
                    <br/>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Write a Todo"
                        required
                        value={this.state.newItem}
                        onChange={e => this.updateInput(e.target.value)}
                    />
                    <button
                        className="add-btn"
                        disabled={!this.state.newItem.length}
                        onClick={e => this.addItem(this.state.newItem)}
                    >
                        Add Todo
                    </button>
                    <div className="list">
                        <ul>
                            {this.state.list.map(item => {
                                return (
                                    <li>
                                        <input
                                            type="checkbox"
                                            name="isDone"
                                            checked={item.isDone}
                                            onChange={() => this.updateItem(item.id)}
                                        />
                                        {item.value}
                                        <button
                                            className="btn"
                                            onClick={() => this.deleteItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default MyApp;
