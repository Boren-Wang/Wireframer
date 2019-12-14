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
            "text": "",
            "fontSize": 30,
            "fontColor": "black",
            "backgroundColor": "white",
            "borderColor": "black",
            "borderThickness": 5, 
            "borderRadius": 3, 
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

    handleClickControl(control) { // ?????
        this.setState({
            ...this.state,
            selected: control
        })        
        console.log(this.state.selected)
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

                <div className="middle" style={{
                    float: "left",
                    width: "50%",
                    height: "100vh",
                    border: "2px solid black"
                }}><Controls controls={this.state.controls} handleClickControl={this.handleClickControl.bind(this)}/></div>

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
