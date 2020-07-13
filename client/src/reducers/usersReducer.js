import { USERS_FETCH_START, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE } from "../actions/userActions";

export const initialState = {
    users: [],
    isFetching: false,
    error: ""
}

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case USERS_FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case USERS_FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.payload,
                error: ""
            }
        case USERS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}