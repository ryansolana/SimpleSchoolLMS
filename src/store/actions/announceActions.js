export const createAnnounce = (announce) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('announces').add({
            ...announce,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_ANNOUCE', announce: announce})
        }).catch((err)=>{
            dispatch({ type: 'CREATE_ANNOUCE_ERROR', err})
        })
    }
};