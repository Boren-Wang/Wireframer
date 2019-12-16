import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';
import testData from './TestData.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    // handleClearUser = () => {
    //     const fireStore = getFirestore();
    //     fireStore.collection('users').get().then(function(querySnapshot){
    //         querySnapshot.forEach(function(doc) {
    //             // if(doc.type==="Administrator") return
    //             console.log("deleting " + doc.id);
    //             fireStore.collection('users').doc(doc.id).delete();
    //         })
    //     });
    // }

    handleReset = () => {
        const fireStore = getFirestore();
        testData.wireframes.forEach(testData => {
            console.log(testData)
            fireStore.collection('wireframes').add({
                    name: testData.name,
                    authorId: testData.authorId,
                    authorFirstName: testData.authorFirstName,
                    authorLastName: testData.authorLastName,
                    width: testData.width,
                    height: testData.height,
                    controls: testData.controls,
                    editedAt: new Date()
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    // handleResetUser = () => {
    //     const fireStore = getFirestore();
    //     testData.users.forEach(testData => {
    //         // if(testData.type==="Administer") return
    //         fireStore.collection('users').add({
    //                 id: testData.id,
    //                 key: testData.key,
    //                 type: testData.type,
    //                 email: testData.email,
    //                 password: testData.password,
    //                 firstName: testData.firstName,
    //                 lastName: testData.lastName
    //             }).then(() => {
    //                 console.log("DATABASE RESET");
    //             }).catch((err) => {
    //                 console.log(err);
    //             });
    //     });
    // }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <button onClick={this.handleClear}>Clear Wireframes</button>
                <button onClick={this.handleReset}>Reset Wireframes</button>
                {/* <button onClick={this.handleClearUser}>Clear Non-Administer Users</button>
                <button onClick={this.handleResetUser}>Reset User</button> */}
            </div>
        )
        // let isAdmin = this.props.isAdmin

        // if(isAdmin){return (
        //     <div>
        //         <button onClick={this.handleClear}>Clear Wireframes</button>
        //         <button onClick={this.handleReset}>Reset Wireframes</button>
        //         {/* <button onClick={this.handleClearUser}>Clear Non-Administer Users</button>
        //         <button onClick={this.handleResetUser}>Reset User</button> */}
        //     </div>
        // )} else {
        //     return <Redirect to="/login" />;
        // }
    }
}

const mapStateToProps = function (state, ownProps) {
    // const  users  = state.firestore.data.users
    // const {id} = state.firebase.auth.uid
    // console.log(state)
    // let isAdmin
    // for(var i=0; i<users.length; i++){
    //     if(users[i].id===id){
    //         isAdmin = users[i].isAdmin
    //     }
    // }
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
        // isAdmin: isAdmin
    };
}

export default connect(mapStateToProps)(DatabaseTester);

// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//         { collection: 'users' },
//     ]),
// )(DatabaseTester);

