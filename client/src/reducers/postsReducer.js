
export const initialState = {
    posts: [],
    isFetching: false,
    error: {}
}

export default function postsReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}