export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) =>{
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();

        firebase.auth().signOut().then(()=>{
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) =>{
            firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName.charAt(0).toUpperCase() + newUser.firstName.slice(1),
                lastName: newUser.lastName.charAt(0).toUpperCase() + newUser.lastName.slice(1),
                initials: newUser.firstName[0] + newUser.lastName[0],
                email: newUser.email,
                joinDate: new Date(),
                isActivated: false
            })

            {/* firestore.collection('students').doc(resp.user.uid).set({
                firstName: newUser.firstName.charAt(0).toUpperCase() + newUser.firstName.slice(1),
                lastName: newUser.lastName.charAt(0).toUpperCase() + newUser.lastName.slice(1),
                initials: newUser.firstName[0] + newUser.lastName[0],
                email: newUser.email,
                joinDate: new Date()
            })   */}
           
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch((err)=>{
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}


export const setStudentActivation = (uid, status) => {
    return (dispatch, getState, {getFirebase, getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore.collection('students').doc(uid).update({
            activated: status
        }).then(()=>{
            dispatch({type: 'STUDENT_ACTIVATION_SUCCESS'})
        }).catch((err)=>{
            dispatch({type: 'STUDENT_ACTIVATION_ERROR', err})
        })
    }
}