const initState = {
    announces: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
      ]
}

const announceReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_ANNOUNCE':
            console.log('created announce', action.announce)
            return state;
        case 'CREATE_ANNOUNCE_ERR':
            console.log('create announce error', action.err)
            return state;
        case 'DELETE_ANNOUNCE':
            console.log('deleted announce', action.announce)
            return state;
        case 'DELETE_ANNOUNCE_ERR':
            console.log('delete announce err', action.err)
            return state;
        default:
            return state;
    }
}



export default announceReducer