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
            // borderWidth: props.control.borderThickness+"px",
            borderRadius: this.props.control.borderRadius+"px",
            textAlign: "center"
        }

        return (
            <Rnd
                style={style}
                bounds=".middle"
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
                {this.props.control.text}
            </Rnd>
        )
    }
}

