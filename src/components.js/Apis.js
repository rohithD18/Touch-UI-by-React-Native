import axios from "axios";

export const login =  axios.create({
    baseURL: 'https://test.touchapp.in/auth/login'
})

export const feeds = axios.create({
    baseURL: 'https://test.touchapp.in/api',
})

export const postDetails = axios.create({
    baseURL: 'https://test.touchapp.in/api/getPostDetails',
})

