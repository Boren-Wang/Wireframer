import React, { Component } from 'react'
import {Rnd} from 'react-rnd';

export default class Container extends Component {        
    render() {
        const style = {
            fontSize: this.props.control.fontSize+"px",
            color: this.props.control.textColor,
            backgroundColor: this.props.control.backgroundColor,
            border: this.props.control.borderThickness+"px solid "+this.props.control.borderColor,
            // borderColor: props.control.borderColor,
            borderWidth: this.props.control.borderThickness+"px",
            borderRadius: this.props.control.borderRadius+"px",
        }
        const cornerClass = this.props.selected?"":"not-selected"

        return (
            <Rnd
                style={style}
                bounds=".diagram"
                size={{ width: this.props.control.width, height: this.props.control.height }}
                position={{ x: this.props.control.x, y: this.props.control.y }}
                onDragStop={(e, d) => {
                    this.props.onDragStop(e, d, this.props.control.id);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    console.log("Resizing")
                    this.props.onResizeStop(e, direction, ref, delta, position, this.props.control.id)
                }}
            >
                <div className={cornerClass} style={{width: "10px", height: "10px", position: "absolute", top: "0", left: "0", background: "white", border: "1px solid black"}}></div>
                <div className={cornerClass} style={{width: "10px", height: "10px", position: "absolute", top: "0", right: "0", background: "white", border: "1px solid black"}}></div>
                <div className={cornerClass} style={{width: "10px", height: "10px", position: "absolute", bottom: "0", left: "0", background: "white", border: "1px solid black"}}></div>
                <div className={cornerClass} style={{width: "10px", height: "10px", position: "absolute", bottom: "0", right: "0", background: "white", border: "1px solid black"}}></div>
                <div
                    style={{textAlign: "left", paddingLeft: "2px"}}
                >
                    {this.props.control.text}
                </div>
            </Rnd>
        )
    }
}

