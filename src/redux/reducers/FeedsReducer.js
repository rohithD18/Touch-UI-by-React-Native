const initialState = {
    homeFeeds : [],
}

export const feedsReducer = (state = initialState, action)=>{
    switch(action.type){
        case "FEEDS":
            return {
                ...state,
                homeFeeds : action.payload,
            }
        default:
            return state;
    }
}