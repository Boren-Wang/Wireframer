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
                    let selected = false
                    if(control === this.props.selected){
                        selected = true
                    }
                    if(control.type==="container") {
                        return (
                            <div 
                                onClick={(e)=>this.props.handleClickControl(e, control)}
                            >
                                <Container 
                                    control={control}
                                    selected={selected}
                                    onDragStop={this.props.onDragStop}
                                    onResizeStop={this.props.onResizeStop}
                                />
                            </div>
                        )
                    } else if(control.type==="label"){
                        return (
                            <div 
                                onClick={(e)=>this.props.handleClickControl(e, control)}
                                style={{
                                }}
                            >
                                <Label
                                    control={control}
                                    selected={selected}
                                    onDragStop={this.props.onDragStop}
                                    onResizeStop={this.props.onResizeStop}
                                />
                            </div>
                        )
                    } else if(control.type==="button"){
                        return (
                            <div 
                                onClick={(e)=>this.props.handleClickControl(e, control)}
                            >
                                <Button 
                                    control={control}
                                    selected={selected}
                                    onDragStop={this.props.onDragStop}
                                    onResizeStop={this.props.onResizeStop}
                                />
                            </div>
                        )
                    } else if(control.type==="textfield"){
                        return (
                            <div 
                                onClick={(e)=>this.props.handleClickControl(e, control)}
                                // style={{textAlign: "left"}}
                            >
                                <Textfield
                                    control={control}
                                    selected={selected}
                                    onDragStop={this.props.onDragStop}
                                    onResizeStop={this.props.onResizeStop}
                                />
                            </div>
                        )
                    } else {
                        return <div></div>
                    }
                })}
            </div>
        )
    }
}
