const initialState = {
    token : '',
}

export const loginReducer = (state = initialState, action)=>{
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                token : action.payload
            };
        default:
            return state;
    }
}