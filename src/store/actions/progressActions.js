export const createProgressModule = (progressModule) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('progressModules').add({
            ...progressModule,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_PROGRESSMODULE', progressModule: progressModule})
        }).catch((err)=>{
            dispatch({ type: 'CREATE_PROGRESSMODULE_ERROR', err})
        })
    }
}

export const deleteProgressModule = (progressModuleId) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(progressModuleId);
        firestore.collection('progressModules').doc(progressModuleId).delete()
        .then(()=>{
            dispatch({ type: 'DELETE_PROGRESSMODULE'})
        }).catch((err)=>{
            dispatch({ type: 'DELETE_PROGRESSMODULE_ERROR', err})
        });
    }
}

