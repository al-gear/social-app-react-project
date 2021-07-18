import { COMMENT, CREATE, DELETE, END_LOADING, FETCH_ALL, LIKE, START_LOADING } from "../constants/actionTypes";
import * as api from "../api";




export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });

    } catch (error) {
        console.log(error)
    }
};

export const createPost = (newPost, history) => async (dispatch) => {
    try {

        const { data } = await api.createPost(newPost);

        dispatch({ type: CREATE, payload: data });
        history.push("/");

    } catch (error) {
        console.log(error)
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments
    } catch (error) {
        console.log(error)
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
};
