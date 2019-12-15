import React, { Component } from 'react'
import {Button} from 'react-materialize'

export default class DimensionForm extends Component {
    state={
        width: this.props.wireframe.width,
        height: this.props.wireframe.height,
        name: this.props.wireframe.name,
        canUpdate: false
    }
    onChange(e) {
        const { target } = e;
        this.setState(prevState=>{
            prevState[target.id] = target.value
            prevState.canUpdate = true
            return prevState
        });
    }
    render() {
        const updateClass = this.state.canUpdate?"":"disabled"
        return (
            <div id="dimension" style={{border: "1px solid black"}}>
                <div className="container">
                    <div className="input-field">
                        <label htmlFor="width" className="active">Wireframe Width</label>
                        <input type="text" id="width" name="width" defaultValue={this.state.width} onChange={this.onChange.bind(this)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="height" className="active">Wireframe Height</label>
                        <input type="text" id="height" name="height" defaultValue={this.state.height} onChange={this.onChange.bind(this)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name" className="active">Wireframe Name</label>
                        <input type="text" id="name" name="name" defaultValue={this.state.name} onChange={this.onChange.bind(this)}/>
                    </div>
                    <Button
                        node="button"
                        className={updateClass}
                        style={{
                            marginBottom: "5px"
                        }}
                        waves="light"
                        small
                        onClick={()=>{
                            if(
                                isNaN(this.state.width)||
                                isNaN(this.state.height)||
                                !Number.isInteger(Number(this.state.width))||
                                !Number.isInteger(Number(this.state.height))||
                                this.state.width>5000||
                                this.state.height>5000||
                                this.state.width<1||
                                this.state.height<1
                            ) {
                                // console.log(Number.isInteger(this.state.width))
                                // console.log(Number.isInteger(this.state.height))
                                alert("Invalid dimension! Please enter an integer that is between 1 and 5000.")
                                return
                            }
                            this.props.onUpdate(this.state.width, this.state.height, this.state.name)
                            this.setState({
                                ...this.state,
                                canUpdate: false
                            })
                        }}
                    >
                        Update
                    </Button>
                </div>
            </div>
        )
    }
}
