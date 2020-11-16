const initState = {
    grades: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
        {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
      ]
}

const gradeReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_GRADE':
            console.log('created grade', action.grade)
            return state;
        case 'CREATE_GRADE_ERR':
            console.log('create grade error', action.err)
            return state;
        case 'UPDATE_GRADE':
            console.log('updated grade', action.grade)
            return state;
        case 'UPDATE_GRADE_ERR':
            console.log('updated grade error', action.err)
            return state;
        case 'DELETE_GRADE':
            console.log('deleted grade', action.grade)
            return state;
        case 'DELETE_GRADE_ERR':
            console.log('delete grade err', action.err)
            return state;
        default:
            return state;
    }
}



export default gradeReducer