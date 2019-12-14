import React, { Component } from 'react'
import Container from './Container'
import Label from './Label'
import Button from './Button'
import Textfield from './Textfield'

export default class Controls extends Component {
    render() {
        const {controls} = this.props
        console.log("Controls: ",controls)
        return (
            <div>
                {controls && controls.map(control => {
                    if(control.type==="container") {
                        return (
                            <div 
                                onClick={(e)=>this.props.handleClickControl(e, control)}
                            >
                                <Container 
                                    control={control}
                                    onDragStop={this.props.onDragStop}
                                    onResizeStop={this.props.onResizeStop}
                                />
                            </div>
                        )
                    } else if(control.type==="label"){
                        return (<div onClick={()=>this.props.handleClickControl(control)}><Label control={control}/></div>)
                    } else if(control.type==="button"){
                        return (<div onClick={()=>this.props.handleClickControl(control)}><Button control={control}/></div>) 
                    } else if(control.type==="textfield"){
                        return (<div onClick={()=>this.props.handleClickControl(control)}><Textfield control={control}/></div>)
                    } else {
                        return <div></div>
                    }
                })}
            </div>
        )
    }
}
