import { COMMENT, CREATE, DELETE, END_LOADING, FETCH_ALL, LIKE, START_LOADING } from "../constants/actionTypes";

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case END_LOADING:
            return { ...state, isLoading: false };
        case CREATE:
            return {
                ...state, posts: [...state.posts, action.payload],
            }
        case DELETE:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }

        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            }

        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                })
            }



        default:
            return state;
    }
};

export default postReducer;