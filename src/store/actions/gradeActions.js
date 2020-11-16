export const createGrade = (grade, userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('grades').doc(userId).collection('gradeList').add({
            ...grade,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_GRADE', grade: grade})
        }).catch((err)=>{
            dispatch({ type: 'CREATE_GRADE_ERROR', err})
        })
    }
}

export const updateGrade = (grade, userId, gradeId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('grades').doc(gradeId).update({
            ...grade,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId
        }).then(()=>{
            dispatch({ type: 'UPDATE_GRADE', grade: grade})
        }).catch((err)=>{
            dispatch({ type: 'UPDATE_GRADE_ERROR', err})
        })
    }
}

export const deleteGrade = (gradeId) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(gradeId);
        firestore.collection('grades').doc(gradeId).delete()
        .then(()=>{
            dispatch({ type: 'DELETE_GRADE'})
        }).catch((err)=>{
            dispatch({ type: 'DELETE_GRADE_ERROR', err})
        });
    }
}

