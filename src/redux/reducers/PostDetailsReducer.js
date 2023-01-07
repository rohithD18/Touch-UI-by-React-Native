const initialState = {
    postDetails : '',
}

export const postDetailsReducer =(state = initialState, action) =>{
    switch(action.type){
        case "POST_DETAILS":
            return {
                ...state,
                postDetails : action.payload
            }
        default:
            return state;    
    }
}