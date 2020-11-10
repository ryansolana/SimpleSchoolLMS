const initState = {
    coursemats: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
      ]
}

const coursematReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_COURSEMAT':
            console.log('created coursemat', action.coursemat)
            return state;
        case 'CREATE_COURSEMAT_ERR':
            console.log('create coursemat error', action.err)
            return state;
        case 'UPDATE_COURSEMAT':
            console.log('created coursemat', action.coursemat)
            return state;
        case 'UPDATE_COURSEMAT_ERR':
            console.log('create coursemat error', action.err)
            return state;
        case 'DELETE_COURSEMAT':
            console.log('deleted coursemat', action.coursemat)
            return state;
        case 'DELETE_COURSEMAT_ERR':
            console.log('delete coursemat err', action.err)
            return state;
        default:
            return state;
    }
}

export default coursematReducer