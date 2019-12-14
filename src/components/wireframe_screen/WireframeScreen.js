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
        controls: this.props.wireframe.controls
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }
    // handleChange = (e) => {
    //     const { target } = e;
    //     this.setState(prevState => {
    //         let wireframe = prevState.wireframe
    //         wireframe[target.id] = target.value
    //         wireframe["editedAt"] = new Date()
    //         return {
    //             wireframe
    //         }
    //     }, ()=>this.props.editwireframe(this.state.wireframe));
    // }

    handleCreateControl = (type) => {
        const newControl = {
            "id": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].id+1,
            "key": this.state.controls.length===0?0:this.state.controls[this.state.controls.length-1].key+1,
            "type": "",
            "text": "New Control",
            "fontSize": 12,
            "textColor": "#000000",
            "backgroundColor": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": 1, 
            "borderRadius": 1, 
            "width": 100,
            "height": 50,
            "x": 0,
            "y": 0
        }
        if(type==="container") {
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "container"
                })
                return prevState
            })
        } else if(type==="label"){
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "label"
                })
                return prevState
            })
        } else if(type==="button"){
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "button"
                })
                return prevState
            })
        } else{
            this.setState(prevState => {
                prevState.controls.push({
                    ...newControl,
                    type: "textfield"
                })
                return prevState
            })
        } 
    }

    handleClickControl(e, control) { // ?????
        e.stopPropagation()
        this.setState({
            ...this.state,
            selected: control
        })        
        // console.log(this.state.selected)
    }

    onClickEmpty() {
        this.setState({
            ...this.state,
            selected: null
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
            width: "25%",
            height: "100vh",
            border: "2px solid black"
        }
        return (
            <div>
                <div style={divStyle}>
                    <LeftSubscreen 
                        handleCreateControl={this.handleCreateControl.bind(this)}
                        handleSave = {this.handleSave.bind(this)}
                        handleClose = {this.handleClose.bind(this)}
                    />
                </div>

                <div 
                    className="middle" 
                    style={{
                    float: "left",
                    width: "50%",
                    height: "100vh",
                    border: "2px solid black"
                    }}
                    onClick={this.onClickEmpty.bind(this)}
                >
                    <Controls 
                        controls={this.state.controls} 
                        handleClickControl={this.handleClickControl.bind(this)}
                        onDragStop={this.onDragStop.bind(this)}
                        onResizeStop={this.onResizeStop.bind(this)}
                    />
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
