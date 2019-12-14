import React from 'react'
import {Button, Modal} from 'react-materialize'

export default function LeftSubscreen(props) {
    const trigger = <Button
        node="button"
        style={{
        
        }}
        waves="light"
        small
    >
        Close
    </Button>

    return (
        <div>

        <div style={{border: "1px solid black", overflow: "auto"}}>
            <Button
                node="button"
                style={{
                    marginRight: '10px'
                }}
                waves="light"
                small
            >
                <i class="fas fa-search-plus"></i>
            </Button>
            
            <Button
                node="button"
                style={{
                    marginRight: '10px'
                }}
                waves="light"
                small
            >
                <i class="fas fa-search-minus"></i>
            </Button>

            <Button
                node="button"
                style={{
                    marginRight: '10px'
                }}
                waves="light"
                small
                onClick = {props.handleSave}
            >
                Save
            </Button>

            <Modal
                trigger={trigger}
                header="Do you want to save the diagram before you go home?"
                actions={[
                    <Button flat modal="close" node="button" waves="green" onClick = {props.handleClose}>Don't Save</Button>,
                    <Button flat modal="close" node="button" waves="green">Cancel</Button>,
                    <Button flat modal="close" node="button" waves="green" onClick = {props.handleSave}>Save</Button>
                ]}
            >
                <p>Your changes will be lost if you don't save them.</p>
                
            </Modal>
        </div>

        <div>
            <div className="add_control_button z-depth-2" style={{height: "150px", textAlign: "center"}} onClick={()=>props.handleCreateControl("container")}>
                <svg width="100%" height="110px">
                    <rect width="70%" height="70%" style={{fill: "rgb(255,255,255)", strokeWidth: "2", stroke: "rgb(0,0,0)"}} x="15%" y="5%"/>s
                </svg>
                <h6><strong>Container</strong></h6>
            </div>

            <div className="add_control_button z-depth-2" style={{height: "150px", textAlign: "center", marginTop: "10%"}} onClick={()=>props.handleCreateControl("label")}>
                <div className="container">
                    <label style={{fontSize: "2em"}}>Prompt for Input:</label>
                    <h6><strong>Label</strong></h6>
                </div>
            </div>

            <div className="add_control_button z-depth-2" style={{height: "150px", textAlign: "center", marginTop: "10%"}} onClick={()=>props.handleCreateControl("button")}>
                <div className="container">
                    <button>Submit</button>
                    <h6><strong>Button</strong></h6>
                </div>
            </div>

            <div className="add_control_button z-depth-2" style={{height: "150px", textAlign: "center", marginTop: "10%"}} onClick={()=>props.handleCreateControl("textfield")}>
                <div className="container">
                    <input type="text"/>
                    <h6><strong>Textfield</strong></h6>
                </div>
            </div>
        
        </div>

        </div>
    )
}
