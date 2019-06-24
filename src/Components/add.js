import React from 'react';
import './Add.css';
import './view.css'


let dataObj = {
    "air": {
        "plane": [
            "Boeing 737",
            "Boeing 747"
        ],
        "helicopter": [
            "Bell",
            "Eurocopter"
        ]
    },
    "ground": {
        "car": [
            "Porsche",
            "Lamborghini"
        ],
        "truck": [
            "Man",
            "Volvo"
        ]
    }
}

class Add extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            status: '',
            status1: '',
            status2: '',
            status3: '',
            vehicleGroup: Object.keys(dataObj),
            vehicleType: [],
            vehicleModel: [],
            todos: JSON.parse(localStorage.getItem('todos')),
            editTodoId: "",
            editTodoName: "",
            editTodoStatus: "",
            editTodoGroup: "",
            editTodoType: "",
            editTodoModel: "",
            editTodoIndex: "",

        }
    }
    componentWillMount() {
        // console.log(this.state.vehicleGroup);
    }
    inputHandler(event) {
        this.setState({ name: event.target.value })
    }

    onValueChange(event) {
        let d = event.target.value
        this.setState({
            status: event.target.value,
            vehicleType: Object.keys(dataObj[d])
        });
    }
    onValueChange1(event) {
        let d = event.target.value
        this.setState({
            status1: event.target.value,
            vehicleModel: dataObj[this.state.status][d]
        });
    }
    onValueChange2(event) {
        this.setState({
            status2: event.target.value,
        });
    }
    onValueChange3(event) {
        this.setState({
            status3: event.target.value,
        });
    }
    add() {
        let submit = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status3,
            vehicleGroup: this.state.status,
            vehicleType: this.state.status1,
            vehicleModel: this.state.status2
        }
        if (localStorage.getItem('todos') == null) {
            let todos = [];
            todos.push(submit);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        else {
            let todos = JSON.parse(localStorage.getItem('todos'));
            todos.push(submit);
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        this.setState({
            todos: JSON.parse(localStorage.getItem('todos')),
            name: '',
            status: '',
            // vehicleGroup: '',
            // vehicleType: '',
            // vehicleModel: ''
        });
    }
    delete(e) {
        let index = e.target.getAttribute('data-key');
        let list = JSON.parse(localStorage.getItem('todos'));
        list.splice(index, 1);
        this.setState({
            todos: list
        });
        localStorage.setItem('todos', JSON.stringify(list));

    }
    edit(e) {
        let index = e.target.getAttribute('data-key');
        this.setState({
            // editTodoTitle: this.state.todos[index],
            editTodoName: this.state.todos[index].name,
            editTodoStatus: this.state.todos[index].status,
            editTodoGroup: this.state.todos[index].vehicleGroup,
            editTodoType: this.state.todos[index].vehicleType,
            editTodoModel: this.state.todos[index].vehicleModel,
            editTodoIndex: e.target.getAttribute('data-key')
        })
        console.log(this.state.todos[index].name, "this");

    }
    inputHandler2(event) {
        this.setState({ editTodoName: event.target.value })
    }
    inputHandler3(event) {
        this.setState({ editTodoStatus: event.target.value })
    }
    inputHandler4(event) {
        let d = event.target.value
        this.setState({
            editTodoGroup: event.target.value,
            vehicleType: Object.keys(dataObj[d])
        });
        // this.setState({ editTodoGroup: event.target.value })
    }
    inputHandler5(event) {
        let d = event.target.value
        this.setState({
            editTodoType: event.target.value,
            vehicleModel: dataObj[this.state.editTodoType][d]
        });
        // this.setState({ editTodoType: event.target.value })
    }
    inputHandler6(event) {
        this.setState({ editTodoModel: event.target.value })
    }
    save(e) {
        // console.log(this.state.editTodoId, this.state.editTodoName, this.state.editTodoIndex);
        let edited = {
            name: this.state.editTodoName,
            status: this.state.editTodoStatus,
            vehicleGroup: this.state.editTodoGroup,
            vehicleType: this.state.editTodoType,
            vehicleModel: this.state.editTodoModel,
        }
        console.log(edited)
        let list = JSON.parse(localStorage.getItem('todos'));
        list[this.state.editTodoIndex] = edited;
        localStorage.setItem('todos', JSON.stringify(list));
        this.setState({
            todos: JSON.parse(localStorage.getItem('todos')),
        })
        console.log(list);
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div className="tile" >
                        <div className="wrapper">
                            <div className="header">Add Item</div>
                            <div className="stats inputView">
                                <div><strong>Name</strong><input type="text" className="form-control" id="name" placeholder="Enter Name" value={this.state.name} onChange={this.inputHandler.bind(this)} /></div>
                                <div>
                                    <strong>Status</strong>
                                    <select className="custom-select mr-sm-2" value={this.state.status3} onChange={this.onValueChange3.bind(this)}>
                                        <option>Select Status</option>
                                        <option value="Okay">Okay</option>
                                        <option value="Missing">Missing</option>
                                        <option value="Out">Out</option>
                                    </select>
                                </div>
                            </div>
                            <div className="stats">
                                <div><strong>Vehicle Group</strong>
                                    <select className="custom-select mr-sm-2" value={this.state.status} onChange={this.onValueChange.bind(this)}>
                                        <option>Select vehicle Group</option>
                                        {this.state.vehicleGroup.map((data, index) => {
                                            return (
                                                <option key={index} value={data}>{data}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div><strong>Vehicle Type</strong>
                                    <select className="custom-select mr-sm-2" disabled={this.state.status ? '' : 'disabled'} value={this.state.status1} onChange={this.onValueChange1.bind(this)}>
                                        <option>Select vehicle type</option>
                                        {this.state.vehicleType.map((data, index) => {
                                            return (
                                                <option key={index} value={data}>{data}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div><strong>Vehicle Model</strong>
                                    <select className="custom-select mr-sm-2" disabled={this.state.status1 ? '' : 'disabled'} value={this.state.status2} onChange={this.onValueChange2.bind(this)}>
                                        <option>Select vehicle Model</option>
                                        {this.state.vehicleModel.map((data, index) => {
                                            return (
                                                <option key={index} value={data}>{data}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="footer">
                                {/* <a href="" className="Cbtn Cbtn-primary" >Edit</a> */}
                                <a href="" className="Cbtn Cbtn-danger" onClick={this.add.bind(this)} style={{ backgroundColor: "#3f9903" }}>Add</a>
                            </div>
                        </div>
                    </div>
                </div >


                <div className="card">
                    {this.state.todos.map((todos, index) => {
                        return (
                            <div className="tile" key={index}>
                                <div className="wrapper">
                                    <div className="header">Item List</div>
                                    <div className="stats">
                                        <div><strong>ID</strong> {index} </div>
                                        <div><strong>Name</strong> {todos.name} </div>
                                        <div><strong>Vehicle Status</strong> {todos.status} </div>
                                    </div>
                                    <div className="stats">
                                        <div><strong>Vehicle Group</strong> {todos.vehicleGroup}</div>
                                        <div><strong>Vehicle Type</strong> {todos.vehicleType}</div>
                                        <div><strong>Vehicle Model</strong> {todos.vehicleModel}</div>
                                    </div>
                                    <div className="footer">
                                        <a href="" className="Cbtn Cbtn-primary" data-target="#exampleModal" data-toggle="modal" onClick={this.edit.bind(this)} data-key={index}>Edit</a>
                                        <a href="" className="Cbtn Cbtn-danger" onClick={this.delete.bind(this)} data-key={index} >Delete</a>
                                    </div>
                                </div>
                            </div>

                        )
                    })}


                    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button> */}

                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">EDIT</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Title
                              </p>
                                    {/* <input className="form-control" type="text" value={this.state.editTodoId} onChange={this.inputHandler1.bind(this)} /> */}
                                    <input className="form-control" type="text" value={this.state.editTodoName} onChange={this.inputHandler2.bind(this)} />
                                    <input className="form-control" type="text" value={this.state.editTodoStatus} onChange={this.inputHandler3.bind(this)} />
                                    {/* <input className="form-control" type="text" value={this.state.editTodoGroup} onChange={this.inputHandler4.bind(this)} /> */}
                                    <select className="custom-select mr-sm-2" value={this.state.editTodoGroup} onChange={this.inputHandler4.bind(this)}>
                                        <option>Select vehicle Group</option>
                                        {this.state.vehicleGroup.map((data, index) => {
                                            return (
                                                <option key={index} value={data}>{data}</option>
                                            )
                                        })}
                                    </select>
                                    {/* <input className="form-control" type="text" value={this.state.editTodoType} onChange={this.inputHandler5.bind(this)} /> */}
                                    <select className="custom-select mr-sm-2" value={this.state.editTodoType} onChange={this.inputHandler5.bind(this)}>
                                        <option>{this.state.editTodoType}</option>
                                        {this.state.vehicleType.map((data, index) => {
                                            return (
                                                <option key={index} value={data}>{data}</option>
                                            )
                                        })}
                                    </select>
                                    {/* <input className="form-control" type="text" value={this.state.editTodoModel} onChange={this.inputHandler6.bind(this)} /> */}
                                    <select className="custom-select mr-sm-2" value={this.state.editTodoModel} onChange={this.inputHandler6.bind(this)}>
                                        <option>{this.state.editTodoModel}</option>
                                        {this.state.vehicleModel.map((data, index) => {
                                            return (
                                                <option key={index} value={data}>{data}</option>
                                            )
                                        })}
                                    </select>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.save.bind(this)}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Add;
