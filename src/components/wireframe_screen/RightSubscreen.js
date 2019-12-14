import React, { Component } from 'react'
// import {ChromePicker} from 'react-color'

export default class RightSubscreen extends Component {
    // state = {
    //     displayColorPicker: {
    //         text: false,
    //         background: false,
    //         border: false
    //     },
    //     control: this.props.control
    // }

    // handleChange = (e) => {
    //     const { target } = e;
    //     this.setState(prevState => {
    //         let control = prevState.control
    //         control[target.id] = target.value
    //         return prevState
    //     });
    // }
    render() {
        const control = this.props.control?this.props.control:{
            "type": "",
            "text": "",
            "fontSize": "",
            "fontColor": "",
            "backgroundColor": "",
            "borderColor": "",
            "borderThickness": "", 
            "borderRadius": "", 
        }
        console.log("Right Screen", control)
        console.log("Props", this.props.control)
        return (
            <div class="container">
                <h3>Properties</h3>

                <div className="input-field">
                    <label htmlFor="text" className="active">Text</label>
                    <input type="text" id="text" name="text" value={control.text} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                </div>

                <div className="input-field">
                    <label htmlFor="fontSize" className="active">Font Size</label>
                    <input type="text" id="fontSize" name="fontSize" value={control.fontSize} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                </div>

                <div className="input-field">
                    <label htmlFor="textColor" className="active">Text Color</label>
                    <input type="color" id="textColor" name="textColor" value={control.textColor} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                    {/* <ChromePicker type="text" id="textColor" name="textColor" value={this.state.control.textColor}/> */}
                </div>

                <div className="input-field">
                    <label htmlFor="backgroundColor" className="active">Background Color</label>
                    <input type="color" id="backgroundColor" name="backgroundColor" value={control.backgroundColor} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                    {/* <ChromePicker type="text" id="backgroundColor" name="backgroundColor" value={this.state.control.backgroundColor}/> */}
                </div>

                <div className="input-field">
                    <label htmlFor="borderColor" className="active">Border Color</label>
                    <input type="color" id="borderColor" name="borderColor" value={control.borderColor} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                    {/* <ChromePicker type="text" id="borderColor" name="borderColor" value={this.state.control.borderColor}/> */}
                </div>

                <div className="input-field">
                    <label htmlFor="borderThickness" className="active">Border Thickness</label>
                    <input type="text" id="borderThickness" name="borderThickness" value={control.borderThickness} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                </div>
                
                <div className="input-field">
                    <label htmlFor="borderRadius" className="active">Border Radius</label>
                    <input type="text" id="borderRadius" name="borderRadius" value={control.borderRadius} onChange={(e)=>this.props.handleChange(e, control.id)}/>
                </div>

            </div>
        )
    }
}

