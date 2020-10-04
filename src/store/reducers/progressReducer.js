const initState = {
    progressModules: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
      ]
}

const progressModuleReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_PROGRESSMODULE':
            console.log('created progressModule', action.progressModule)
            return state;
        case 'CREATE_PROGRESSMODULE_ERR':
            console.log('create progressModule error', action.err)
            return state;
        case 'DELETE_PROGRESSMODULE':
            console.log('deleted progressModule', action.progressModule)
            return state;
        case 'DELETE_PROGRESSMODULE_ERR':
            console.log('delete progressModule err', action.err)
            return state;
        default:
            return state;
    }
}



export default progressModuleReducer