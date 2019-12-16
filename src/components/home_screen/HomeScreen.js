import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks';
import {deleteHandler} from "../../store/database/asynchHandler"

class HomeScreen extends Component {

    handleDelete(wireframe) {
        this.props.deleteWireframe(wireframe)
        this.props.history.push("/")
    }
    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks wireframes={this.props.wireframes} handleDelete={this.handleDelete.bind(this)}/>
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer
                        </div>
                        
                        <div className="home_new_wireframe_container">
                            <button className="home_new_wireframe_button">
                                <NavLink to="/create" className="link">Create a New Wireframe</NavLink>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = dispatch => ({
    deleteWireframe: (wireframe) => dispatch(deleteHandler(wireframe))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'wireframes', orderBy: ["editedAt", 'desc']}
    ])
)(HomeScreen);