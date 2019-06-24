import React from 'react';
import './view.css'


class ViewTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
    // deleteAll() {
    //     let deleteArray = JSON.parse(localStorage.getItem('todos'));
    //     deleteArray.splice(0, deleteArray.length);
    //     localStorage.setItem('todos', JSON.stringify(deleteArray));
    //     this.setState({
    //         // todos: deleteArray,
    //         todos: JSON.parse(localStorage.getItem('todos'))
    //     });
    //     console.log(deleteArray)
    //     // localStorage.clear();
    //     // list.splice(0, list.length)
    // }

    inputHandler2(event) {
        this.setState({ editTodoName: event.target.value })
    }
    inputHandler3(event) {
        this.setState({ editTodoStatus: event.target.value })
    }
    inputHandler4(event) {
        this.setState({ editTodoGroup: event.target.value })
    }
    inputHandler5(event) {
        this.setState({ editTodoType: event.target.value })
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
                                <input className="form-control" type="text" value={this.state.editTodoGroup} onChange={this.inputHandler4.bind(this)} />
                                {/* <select className="custom-select mr-sm-2" disabled={this.state.status1 ? '' : 'disabled' } value={this.state.status2} onChange={this.onValueChange2.bind(this)}>
                                    <option>Select vehicle Model</option>
                                    {this.state.vehicleModel.map((data, index) => {
                                        return (
                                            <option key={index} value={data}>{data}</option>
                                        )
                                    })}
                                </select> */}
                                <input className="form-control" type="text" value={this.state.editTodoType} onChange={this.inputHandler5.bind(this)} />
                                <input className="form-control" type="text" value={this.state.editTodoModel} onChange={this.inputHandler6.bind(this)} />


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.save.bind(this)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ViewTodo;
