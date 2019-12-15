import React from 'react'
import {Button, Modal} from 'react-materialize'
import DimensionForm from './DimensionForm'

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

    const saveClass = props.changed?"":"disabled"
    return (
        <div>

        <div style={{border: "1px solid black", overflow: "auto"}}>
            <Button
                node="button"
                style={{
                    marginRight: '3px'
                }}
                waves="light"
                small
                onClick={props.onZoomIn}
            >
                <i class="fas fa-search-plus"></i>
            </Button>
            
            <Button
                node="button"
                style={{
                    marginRight: '3px'
                }}
                waves="light"
                small
                onClick={props.onZoomOut}
            >
                <i class="fas fa-search-minus"></i>
            </Button>

            <Button
                node="button"
                className={saveClass}
                style={{
                    marginRight: '3px'
                }}
                waves="light"
                small
                onClick = {props.handleSave}
            >
                Save
            </Button>

            {!props.changed?
                (<Button
                    node="button"
                    style={{
                    
                    }}
                    waves="light"
                    small
                    onClick = {props.handleClose}
                >
                    Close
                </Button>)
                :
                (<Modal
                    trigger={trigger}
                    header="Do you want to save the diagram before you go home?"
                    actions={[
                        <Button flat modal="close" node="button" waves="green" onClick = {props.handleClose}>Don't Save</Button>,
                        <Button flat modal="close" node="button" waves="green">Cancel</Button>,
                        <Button flat modal="close" node="button" waves="green" onClick = {props.handleSave}>Save</Button>
                    ]}
                >
                    <p>Your changes will be lost if you don't save them.</p>
                    
                </Modal>)
            }
        </div>

        <DimensionForm wireframe={props.wireframe} onUpdate={props.onUpdate}/>
        {/* <div id="dimension" style={{border: "1px solid black"}}>
            <div className="container">
                <div className="input-field">
                    <label htmlFor="width" className="active">Wireframe Width</label>
                    <input type="text" id="width" name="width" defaultValue={props.wireframe.width}/>
                </div>
                <div className="input-field">
                    <label htmlFor="height" className="active">Wireframe Height</label>
                    <input type="text" id="height" name="height" defaultValue={props.wireframe.height}/>
                </div>
                <Button
                    node="button"
                    style={{
                    }}
                    waves="light"
                    small
                    onClick
                >
                    Update
                </Button>
            </div>
        </div> */}

        <div>
            <div className="add_control_button z-depth-2" style={{height: "100px", textAlign: "center"}} onClick={()=>props.handleCreateControl("container")}>
                {/* <svg width="100%" height="110px">
                    <rect width="70%" height="70%" style={{fill: "rgb(255,255,255)", strokeWidth: "2", stroke: "rgb(0,0,0)"}} x="15%" y="5%"/>s
                </svg> */}
                <div style={{display: "inline-block", marginTop: "5px",width: "150px", height: "70px", backgroundColor: "white", border: "1px solid black"}}>
                    
                </div>
                <h6 style={{position: "relative", bottom: "15px"}}><strong>Container</strong></h6>
            </div>

            <div className="add_control_button z-depth-2" style={{height: "100px", textAlign: "center", marginTop: "10%"}} onClick={()=>props.handleCreateControl("label")}>
                <div className="container">
                    <label style={{fontSize: "1em", position: "relative", top: "25px"}}>Prompt for Input:</label>
                    <h6 style={{position: "relative", top: "20px"}}><strong>Label</strong></h6>
                </div>
            </div>

            <div className="add_control_button z-depth-2" style={{height: "100px", textAlign: "center", marginTop: "10%"}} onClick={()=>props.handleCreateControl("button")}>
                <div className="container">
                    <button style={{marginTop: "25px"}}>Submit</button>
                    <h6><strong>Button</strong></h6>
                </div>
            </div>

            <div className="add_control_button z-depth-2" style={{height: "100px", textAlign: "center", marginTop: "10%"}} onClick={()=>props.handleCreateControl("textfield")}>
                <div className="container">
                    <input type="text"/>
                    <h6><strong>Textfield</strong></h6>
                </div>
            </div>
        
        </div>

        </div>
    )
}
