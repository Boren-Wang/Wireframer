import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((error) => {
      dispatch({ type: 'LOGIN_ERROR', error });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess());
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess());
    }).catch((error) => {
        // console.log(error)
        dispatch(actionCreators.registerError(error));
    });
};

export const createHandler = (wireframe) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      // make async call to database
      const firestore = getFirestore()
      const profile = getState().firebase.profile
      const authorId = getState().firebase.auth.uid
      const newWireframe = {
        ...wireframe,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId
      }
      firestore.collection('wireframes').add(newWireframe)
        .then(() => dispatch({type: "CREATE_LIST", newWireframe}))
        .catch(error => dispatch({type: "CREATE_LIST_ERROR", error}))
  }
}

export const editHandler = (wireframe) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore()
      firestore.collection('wireframes').doc(wireframe.id).update(wireframe)
        .then(()=> dispatch({type: "EDIT_LIST", wireframe}) )
        .catch(error => dispatch({type: "EDIT_LIST_ERROR", error}))
  }
}

export const deleteHandler = (wireframe) => {
  console.log("Deleting!")
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.collection('wireframes').doc(wireframe.id).delete()
      .then(()=> dispatch({type: "DELETE_LIST", wireframe}) )
      .catch(error => dispatch({type: "DELETE_LIST_ERROR", error}))
  }
}

// export const createcontrolHandler = (wireframe, newcontrol) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     wireframe.controls.push(newcontrol)
//     const firestore = getFirestore()
//     firestore.collection('wireframes').doc(wireframe.id).update(wireframe)
//       .then(()=> dispatch({type: "CREATE_control", newcontrol}) )
//       .catch(error => dispatch({type: "CREATE_control_ERROR", error}))
//   }
// }

// export const editcontrolHandler = (wireframe, newcontrol) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     // wireframe.controls[newcontrol.id] = newcontrol
//     let index = wireframe.controls.indexOf(wireframe.controls.filter(control => newcontrol.id == control.id)[0])
//     wireframe.controls[index] = newcontrol
//     const firestore = getFirestore()
//     firestore.collection('wireframes').doc(wireframe.id).update(wireframe)
//       .then(()=> dispatch({type: "EDIT_control", newcontrol}) )
//       .catch(error => dispatch({type: "EDIT_control_ERROR", error}))
//   }
// }

// export const deletecontrolHandler = (wireframe, control) => {
//   return (dispatch, getState, {getFirebase, getFirestore}) => {
//     // wireframe.controls[control.id] = null
//     wireframe.controls = wireframe.controls.filter((i)=>i.id!==control.id) 
//     const firestore = getFirestore()
//     firestore.collection('wireframes').doc(wireframe.id).update(wireframe)
//       .then(()=> dispatch({type: "DELETE_control", control}) )
//       .catch(error => dispatch({type: "DELETE_control_ERROR", error}))
//   }
// }
