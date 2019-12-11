import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Button, Icon, Modal} from 'react-materialize'
import WireframeCard from './WireframeCard';
import {editHandler, deleteHandler} from "../../store/database/asynchHandler"

class WireframeLinks extends React.Component {
    constructor() {
        super()
        this.state = {
            
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(wireframe) {
        const newWireframe = {
            ...wireframe,
            editedAt: new Date()
        }
        this.props.editWireframe(newWireframe)
    }

    render() {
        let {wireframes, auth} = this.props;
        if(wireframes){
            console.log(wireframes)
            // wireframes = wireframes.filter((list, index) => wireframes.indexOf(list)===index)
            // wireframes = [...new Set(wireframes)]
            for(let i=0; i<wireframes.length; i++){
                let id = wireframes[i].id
                for(let j=i+1; j<wireframes.length; j++){
                    if(wireframes[j].id === id){
                        wireframes.splice(j, 1)
                        j--;
                    }
                }
            }
        }
        
        const trigger = 
        <Button
            className="pink pulse delete-button"
            floating
            icon={<Icon>delete_forever</Icon>}
            small
            node="button"
            waves="light"
        />
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    wireframe.authorId === auth.uid ?
                        <div>
                            <Link to={'/wireframe/' + wireframe.id} key={wireframe.id} onClick={()=>this.handleClick(wireframe)}>
                                <WireframeCard wireframe={wireframe} />
                            </Link>
                            <Modal 
                                header="Delete the wireframe?" 
                                trigger={trigger} 
                                actions={
                                    <div>
                                        <Button className="red" onClick={ () => this.props.deleteWireframe(wireframe) }>Yes</Button>
                                        <Button modal="close">No</Button>
                                    </div>
                                }
                            >
                                <p><strong>Are you sure to delete this wireframe?</strong></p>
                                <p>The wireframe will not be retrivable.</p>
                            </Modal>
                        </div>
                    : <div></div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    editWireframe: (wireframe) => dispatch(editHandler(wireframe)),
    deleteWireframe: (wireframe) => dispatch(deleteHandler(wireframe))
})

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect([
//         { collection: 'wireframes', orderBy: ["editedAt", 'desc'] }
//     ])
// )(wireframeLinks);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ["editedAt", 'desc']}
    ])
)(WireframeLinks);