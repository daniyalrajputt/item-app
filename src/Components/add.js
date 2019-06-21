import React from 'react';
import './Add.css';


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
            id: 0,
            name: this.state.name,
            status: this.state.status3,
            vehicleGroup: this.state.status,
            vehicleType: this.state.status1,
            vehicleModel: this.state.status2
        }
        localStorage.setItem('data', JSON.stringify(submit));
    }


    render() {
        return (
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-2">Name:</div>
                    <div className="col-md-10">
                        <input type="text" className="form-control" id="name" placeholder="Enter Name" value={this.state.name} onChange={this.inputHandler.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="col-auto my-1">
                            <select className="custom-select mr-sm-2" value={this.state.status3} onChange={this.onValueChange3.bind(this)}>
                                <option>Select Status</option>
                                <option value="Okay">Okay</option>
                                <option value="Missing">Missing</option>
                                <option value="Out">Out</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="col-auto my-1">
                            <select className="custom-select mr-sm-2" value={this.state.status} onChange={this.onValueChange.bind(this)}>
                                <option>Select vehicle Group</option>
                                {this.state.vehicleGroup.map((data, index) => {
                                    return (
                                        <option key={index} value={data}>{data}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="col-auto my-1">
                            <select className="custom-select mr-sm-2" value={this.state.status1} onChange={this.onValueChange1.bind(this)}>
                                <option>Select vehicle type</option>
                                {this.state.vehicleType.map((data, index) => {
                                    return (
                                        <option key={index} value={data}>{data}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="col-auto my-1">
                            <select className="custom-select mr-sm-2" value={this.state.status2} onChange={this.onValueChange2.bind(this)}>
                                <option>Select vehicle Model</option>
                                {this.state.vehicleModel.map((data, index) => {
                                    return (
                                        <option key={index} value={data}>{data}</option>
                                    )
                                })}

                            </select>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={this.add.bind(this)}>Add</button>
            </div >
        )
    }
}

export default Add;
