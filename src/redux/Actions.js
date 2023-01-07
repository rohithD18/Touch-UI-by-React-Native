
export const userInfo = (data)=>{
    return {
        type: "LOGIN",
        payload: data
    }
}

export const getFeeds = (data)=>{
    return {
        type: "FEEDS",
        payload: data
    }
}

export const getPostDetails = (data)=>{
    return {
        type: "POST_DETAILS",
        payload: data
    }
}