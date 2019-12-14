import React from 'react'
import {Rnd} from 'react-rnd';

const style = {
    border: "2px solid black",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
}
export default (props) => (
    <Rnd
        style={style}
        default={{
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        }}
        bounds=".middle"
    >
        {props.control.text}
    </Rnd>
);