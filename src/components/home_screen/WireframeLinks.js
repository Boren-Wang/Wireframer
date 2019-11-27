import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import {editHandler} from "../../store/database/asynchHandler"
import { firestoreConnect } from 'react-redux-firebase';

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
        let wireframes = this.props.wireframes;
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
        

        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/wireframe/' + wireframe.id} key={wireframe.id} onClick={()=>this.handleClick(wireframe)}>
                        <WireframeCard wireframe={wireframe} />
                    </Link>
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
    editWireframe: (wireframe) => dispatch(editHandler(wireframe))
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