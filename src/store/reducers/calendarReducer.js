const initState = {
    calendarModules: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
      ]
}

const calendarModuleReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_CALENDARMODULE':
            console.log('created calendarModule', action.calendarModule)
            return state;
        case 'CREATE_CALENDARMODULE_ERR':
            console.log('create calendarModule error', action.err)
            return state;
        case 'UPDATE_CALENDARMODULE':
            console.log('updated calendarModule', action.calendarModule)
            return state;
        case 'UPDATE_CALENDARMODULE_ERR':
            console.log('updated calendarModule error', action.err)
            return state;
        case 'DELETE_CALENDARMODULE':
            console.log('deleted calendarModule', action.calendarModule)
            return state;
        case 'DELETE_CALENDARMODULE_ERR':
            console.log('delete calendarModule err', action.err)
            return state;
        default:
            return state;
    }
}

export default calendarModuleReducer