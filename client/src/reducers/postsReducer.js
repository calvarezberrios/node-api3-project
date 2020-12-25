import {POST_FETCH_START, POST_FETCH_SUCCESS, POST_FETCH_FAILURE} from "../actions/postActions";

export const initialState = {
    posts: [],
    isFetching: false,
    error: {}
}

export default function postsReducer(state = initialState, action) {
    switch(action.type) {
        case POST_FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case POST_FETCH_SUCCESS:
            return  {
                ...state,
                posts: action.payload,
                isFetching: false,
                error: ""
            }
        case POST_FETCH_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            }
        default:
            return state;
    }
}