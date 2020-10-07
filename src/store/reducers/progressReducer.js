const initState = {
    progressModules: [
        {weekNum: 1, title: 'blah blah blah',
        description: 'I love oranges', progressPercent: 50},
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