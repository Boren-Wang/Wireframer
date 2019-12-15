import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {editHandler} from '../../store/database/asynchHandler'
import LeftSubscreen from './LeftSubscreen'
import RightSubscreen from './RightSubscreen'
import Controls from "./Controls"

class WireframeScreen extends Component {
    state = {
        wireframe: this.props.wireframe,
        selected: null,
        controls: this.props.wireframe.controls,
        scaleIndicator: 1,
        changed: false
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    // onDimensionChange = (e) => {
    //     const { target } = e;
    //     this.setState(prevState => {
    //         let wireframe = prevState.wireframe
    //         wireframe[target.id] = target.value
    //         // wireframe["editedAt"] = new Date()
    //         return {
    //             wireframe
    //         }
    //     });
    // }

    onUpdate(width, height, name) {
        this.setState(prevState => {
            prevState.wireframe.width = width
            prevState.wireframe.height = height
            prevState.wireframe.name = name
            prevState.changed=true
            return prevState
        })
    }

    onZoomIn() {
        this.setState(prevState => {
            prevState.scaleIndicator = prevState.scaleIndicator*2
            prevState.changed=true
            return prevState
        })
    }

    onZoomOut() {
        this.setState(prevState => {
            prevState.scaleIndicator = prevState.scaleIndicator/2
            prevState.changed=true
            return prevState
        })
    }

    handleCreateControl = (type) => {
        if(type==="container") {
            const newControl = {
                "id": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].id+1,
                "key": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].key+1,
                "type": "container",
                "text": "New Container",
                "fontSize": 12,
                "textColor": "#000000",
                "backgroundColor": "#ffffff",
                "borderColor": "#000000",
                "borderThickness": 3, 
                "borderRadius": 10, 
                "width": 300,
                "height": 300,
                "x": 0,
                "y": 0
            }
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "container"
                })
                prevState.changed=true
                return prevState
            })
        } else if(type==="label"){
            const newControl = {
                "id": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].id+1,
                "key": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].key+1,
                "type": "label",
                "text": "Label",
                "fontSize": 12,
                "textColor": "#000000",
                "backgroundColor": "#EEEEDD",
                "borderColor": "#000000",
                "borderThickness": 0, 
                "borderRadius": 0, 
                "width": 50,
                "height": 22,
                "x": 0,
                "y": 0
            }
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "label"
                })
                prevState.changed=true
                return prevState
            })
        } else if(type==="button"){
            const newControl = {
                "id": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].id+1,
                "key": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].key+1,
                "type": "button",
                "text": "Submit",
                "fontSize": 6,
                "textColor": "#000000",
                "backgroundColor": "#d3d3d3",
                "borderColor": "#000000",
                "borderThickness": 1, 
                "borderRadius": 3, 
                "width": 50,
                "height": 22,
                "x": 0,
                "y": 0
            }
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "button"
                })
                prevState.changed=true
                return prevState
            })
        } else{
            const newControl = {
                "id": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].id+1,
                "key": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].key+1,
                "type": "textfield",
                "text": "input",
                "fontSize": 12,
                "textColor": "#A9A9A9",
                "backgroundColor": "#ffffff",
                "borderColor": "#000000",
                "borderThickness": 1, 
                "borderRadius": 5, 
                "width": 150,
                "height": 20,
                "x": 0,
                "y": 0
            }
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "textfield"
                })
                prevState.changed=true
                return prevState
            })
        } 
    }

    handleClickControl(e, control) { // ?????
        e.stopPropagation()
        this.setState({
            ...this.state,
            selected: control,
            changed: true
        })        
        // console.log(this.state.selected)
    }

    onClickEmpty() {
        this.setState({
            ...this.state,
            selected: null,
            changed: true
        }) 
    }

    handleChange = (e, controlId) => {
        const { target } = e;
        this.setState(prevState => {
            for(var i=0; i<prevState.controls.length; i++) {
                if(prevState.controls[i].id === controlId){
                    prevState.controls[i][target.id] = target.value
                }
            }
            prevState.changed=true
            return prevState
        });
    }

    onDragStop = (e, d, controlId) => {
        this.setState(prevState => {
            for(var i=0; i<prevState.controls.length; i++) {
                if(prevState.controls[i].id === controlId){
                    prevState.controls[i].x = d.x
                    prevState.controls[i].y = d.y
                    // console.log(prevState)
                }
            }
            prevState.changed=true
            return prevState
        });
    }

    onResizeStop = (e, direction, ref, delta, position, controlId) => {
        this.setState(prevState => {
            for(var i=0; i<prevState.controls.length; i++) {
                if(prevState.controls[i].id === controlId){
                    prevState.controls[i].width = ref.style.width
                    prevState.controls[i].height = ref.style.height
                    // console.log("prevState after resizing: ",prevState)
                }
            }
            prevState.changed=true
            return prevState
        });
        // this.setState({
        //     width: ref.style.width,
        //     height: ref.style.height,
        //     ...position
        // });
    }

    handleKeyPress = (e) => {
        if(this.state.selected===null){
            return
        }
        if (e.keyCode === 68 && e.ctrlKey) { // control + d
            e.preventDefault()
            let newControl = {...this.state.selected}
            newControl.id = this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].id+1
            newControl.key = this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].key+1
            newControl.x = newControl.x+100
            newControl.y = newControl.y+100
            this.setState(prevState => {
                prevState.controls.push(newControl)
                prevState.changed=true
                return prevState
            }, () => console.log("after duplicate",this.state))
        }
        else if(e.keyCode === 46 || (e.keyCode===8&&e.ctrlKey) || (e.keyCode===8&&e.metaKey)) { // delete
            // e.preventDefault()
            let control = {...this.state.selected}
            this.setState(prevState => {
                for(var i=0; i<prevState.controls.length; i++) {
                    if(prevState.controls[i].id === control.id){
                        prevState.controls.splice(i, 1)
                        prevState.selected = null
                    }
                }
                prevState.changed=true
                return prevState
            })
        }
    }
    OnDuplicate = (control) => {
        let newControl = {...control}
        newControl.x+=100
        newControl.y+=100
        this.setState(prevState => {
            prevState.controls.push(newControl)
            prevState.changed=true
            return prevState
        })
    }

    handleDeleteControl = (controlId) => {
        this.setState(prevState => {
            for(var i=0; i<prevState.controls.length; i++) {
                if(prevState.controls[i].id === controlId){
                    prevState.controls.splice(i, 1)
                }
            }
            prevState.changed=true
            return prevState
        });
    }

    handleSave = () => {
        let wireframe = this.state.wireframe
        wireframe.controls = this.state.controls
        this.props.editWireframe(wireframe)
        this.props.history.push("/")
    }

    handleClose = () => {
        this.props.history.push("/")
    }

    render() {
        const auth = this.props.auth;
        // const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        // if(!wireframe)
        //     return <React.Fragment />
        const divStyle = {
            float: "left",
            width: "22.5%",
            height: "100vh",
            border: "2px solid black"
        }
        return (
            <div>
                <div style={divStyle}>
                    <LeftSubscreen 
                        wireframe={this.state.wireframe}
                        changed={this.state.changed}
                        // onDimensionChange={this.onDimensionChange.bind(this)}
                        onUpdate = {this.onUpdate.bind(this)}
                        onZoomIn = {this.onZoomIn.bind(this)}
                        onZoomOut = {this.onZoomOut.bind(this)}
                        handleCreateControl={this.handleCreateControl.bind(this)}
                        handleSave = {this.handleSave.bind(this)}
                        handleClose = {this.handleClose.bind(this)}
                    />
                </div>

                <div 
                    className="middle" 
                    style={{
                        float: "left",
                        width: "55%",
                        height: "100vh",
                        textAlign: "center",
                        display: "flex", // vertical alignment
                        justifyContent: "center", // vertical alignment
                        alignItems: "center", // vertical alignment
                        overflowX: "scroll",
                        overflowY: "scroll",
                        border: "2px solid black",
                    }}
                >   
                    <div 
                        className="diagram"
                        style={{
                            border: "2px solid black",
                            display: "inline-block", // horizontal alignment
                            width: this.state.wireframe.width+"px",
                            height: this.state.wireframe.height+"px",
                            transformOrigin: "0 0", 
                            transform: "scale("+this.state.scaleIndicator+")",
                        }}
                        onClick={this.onClickEmpty.bind(this)}
                    >
                    <Controls 
                        controls={this.state.controls} 
                        selected={this.state.selected}
                        handleClickControl={this.handleClickControl.bind(this)}
                        onDragStop={this.onDragStop.bind(this)}
                        onResizeStop={this.onResizeStop.bind(this)}
                    />
                    </div>
                </div>

                <div style={divStyle}><RightSubscreen control={this.state.selected} handleChange={this.handleChange.bind(this)}/></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data; // wireframes is a map/object from id to wireframe, not a array
    const wireframe = wireframes ? wireframes[id] : null;
    if(wireframe) {
        wireframe.id = id;
    }

  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
    editWireframe: (wireframe) => dispatch(editHandler(wireframe)),
    // deleteControl: (wireframe) => dispatch(deleteControlHandler(wireframe)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(WireframeScreen);
