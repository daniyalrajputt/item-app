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
            vehicleModel: []

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


    render() {
        return (
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
                                <select className="custom-select mr-sm-2"  value={this.state.status} onChange={this.onValueChange.bind(this)}>
                                    <option>Select vehicle Group</option>
                                    {this.state.vehicleGroup.map((data, index) => {
                                        return (
                                            <option key={index} value={data}>{data}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div><strong>Vehicle Type</strong>
                                <select className="custom-select mr-sm-2" disabled={this.state.status ? '' : 'disabled' } value={this.state.status1} onChange={this.onValueChange1.bind(this)}>
                                    <option>Select vehicle type</option>
                                    {this.state.vehicleType.map((data, index) => {
                                        return (
                                            <option key={index} value={data}>{data}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div><strong>Vehicle Model</strong>
                                <select className="custom-select mr-sm-2" disabled={this.state.status1 ? '' : 'disabled' } value={this.state.status2} onChange={this.onValueChange2.bind(this)}>
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
        )
    }
}

export default Add;
