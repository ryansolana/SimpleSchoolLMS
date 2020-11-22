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
        }).then((docRef)=>{
            firestore.collection('grades').doc(userId).collection('gradeList').doc(docRef.id).update({
                gradeId: docRef.id
            }).then(()=>{
                dispatch({ type: 'CREATE_GRADE', grade: grade})
            }).catch((err)=>{
                dispatch({ type: 'CREATE_GRADE_ERROR', err})
            })
            
        }).catch((err)=>{
            dispatch({ type: 'CREATE_GRADE_ERROR', err})
        })
    }
}

export const updateGrade = (grade, id, gradeId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        
        firestore.collection("grades").doc(id).collection("gradeList").doc(gradeId).update({
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

export const deleteGrade = (id, gradeId) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        
        firestore.collection("grades").doc(id).collection("gradeList").doc(gradeId).delete()
        .then(()=>{
            dispatch({ type: 'DELETE_GRADE'})
        }).catch((err)=>{
            dispatch({ type: 'DELETE_GRADE_ERROR', err})
        });
    }
}

