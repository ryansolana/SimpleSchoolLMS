const initState = {
    submissions: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
      ]
}

const submissionReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_SUBMISSION':
            console.log('created submission', action.submission)
            return state;
        case 'CREATE_SUBMISSION_ERR':
            console.log('create submission error', action.err)
            return state;
        case 'UPDATE_SUBMISSION':
            console.log('created submission', action.submission)
            return state;
        case 'UPDATE_SUBMISSION_ERR':
            console.log('create submission error', action.err)
            return state;
        case 'DELETE_SUBMISSION':
            console.log('deleted submission', action.submission)
            return state;
        case 'DELETE_SUBMISSION_ERR':
            console.log('delete submission err', action.err)
            return state;
        default:
            return state;
    }
}

export default submissionReducer