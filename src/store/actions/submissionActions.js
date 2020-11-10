export const createSubmission = (submission) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('submissions').add({
            ...submission,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_SUBMISSION', submission: submission})
        }).catch((err)=>{
            dispatch({ type: 'CREATE_SUBMISSION_ERROR', err})
        })
    }
}

export const updateSubmission = (submission, submissionId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('submissions').doc(submissionId).update({
            ...submission,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId
        }).then(()=>{
            dispatch({ type: 'UPDATE_SUBMISSION', submission: submission})
        }).catch((err)=>{
            dispatch({ type: 'UPDATE_SUBMISSION_ERROR', err})
        })
    }
}

export const deleteSubmission = (submissionId) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(submissionId);
        firestore.collection('submissions').doc(submissionId).delete()
        .then(()=>{
            dispatch({ type: 'DELETE_SUBMISSION'})
        }).catch((err)=>{
            dispatch({ type: 'DELETE_SUBMISSION_ERROR', err})
        });
    }
}

