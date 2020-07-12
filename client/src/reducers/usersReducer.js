
export const initialState = {
    users: [],
    isFetching: false,
    error: {}
}

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}