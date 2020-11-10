export const createCalendarModule = (calendarModule) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('calendarModules').add({
            ...calendarModule,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({ type: 'CREATE_CALENDARMODULE', calendarModule: calendarModule})
        }).catch((err)=>{
            dispatch({ type: 'CREATE_CALENDARMODULE_ERROR', err})
        })
    }
}

export const updateCalendarModule = (calendarModule, calendarModuleId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        firestore.collection('calendarModules').doc(calendarModuleId).update({
            ...calendarModule,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId
        }).then(()=>{
            dispatch({ type: 'UPDATE_CALENDARMODULE', calendarModule: calendarModule})
        }).catch((err)=>{
            dispatch({ type: 'UPDATE_CALENDARMODULE_ERROR', err})
        })
    }
}

export const deleteCalendarModule = (calendarModuleId) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        console.log(calendarModuleId);
        firestore.collection('calendarModules').doc(calendarModuleId).delete()
        .then(()=>{
            dispatch({ type: 'DELETE_CALENDARMODULE'})
        }).catch((err)=>{
            dispatch({ type: 'DELETE_CALENDARMODULE_ERROR', err})
        });
    }
}

