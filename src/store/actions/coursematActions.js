export const createCourseMat = (coursemat) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('coursemats').add({
            ...coursemat,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_COURSEMAT', coursemat: coursemat})
        }).catch((err)=>{
            dispatch({ type: 'CREATE_COURSEMAT_ERROR', err})
        })
    }
}

export const updateCourseMat = (coursemat, coursematId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('coursemats').doc(coursematId).update({
            ...coursemat,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId
        }).then(()=>{
            dispatch({ type: 'UPDATE_COURSEMAT', coursemat: coursemat})
        }).catch((err)=>{
            dispatch({ type: 'UPDATE_COURSEMAT_ERROR', err})
        })
    }
}

export const deleteCourseMat = (coursematId) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(coursematId);
        firestore.collection('coursemats').doc(coursematId).delete()
        .then(()=>{
            dispatch({ type: 'DELETE_COURSEMAT'})
        }).catch((err)=>{
            dispatch({ type: 'DELETE_COURSEMAT_ERROR', err})
        });
    }
}

