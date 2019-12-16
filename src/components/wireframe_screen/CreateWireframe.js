import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import {createHandler} from '../../store/database/asynchHandler'

class CreateList extends Component {
  state = {
    "name": "New Wireframe",
    // "author": "", 
    "height": "500",
    "width": "500",
    "authorFirstName": "",
    "authorLastName": "",
    "authorId": "",
    "controls": [],
    "editedAt": new Date()
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { props, state } = this;
    const { firebase } = props;
    const newList = { 
      ...state, 
      editedAt: new Date()
    };

    this.props.createWireframe(newList)
    this.props.history.push("/")
  }

  render() {
    const { auth, authError } = this.props;
    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create a New Wireframe</h5>
          <div className="input-field">
            <label htmlFor="name" className="active">Name</label>
            <input type="name" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="height" className="active">Height</label>
            <input type="height" name="height" id="height" value={this.state.height} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="width" className="active">Width</label>
            <input type="width" name="width" id="width" value={this.state.width} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1 z-depth-0">Create</button>
            {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    authError: state.auth.authError
})

const mapDispatchToProps = dispatch => ({
  createWireframe: (wireframe) => dispatch(createHandler(wireframe))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: "wireframes" }
  ])
)(CreateList);
