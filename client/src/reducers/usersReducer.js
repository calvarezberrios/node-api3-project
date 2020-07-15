import { USERS_FETCH_START, USERS_FETCH_SUCCESS, USERS_FETCH_FAILURE, EDIT_USER, DELETE_USER, CREATE_USER } from "../actions/userActions";

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
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.payload.id) {
                        return action.payload;
                    }
                    return user;
                }),
                error: ""
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
                error: ""
            }
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
                error: ""
            }
        default:
            return state;
    }
}