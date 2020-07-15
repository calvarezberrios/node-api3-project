import axios from "axios";

export const POST_FETCH_START = "POST_FETCH_START";
export const POST_FETCH_SUCCESS = "POST_FETCH_SUCCESS";
export const POST_FETCH_FAILURE = "POST_FETCH_FAILURE";

export const getPosts = () => dispatch => {
    dispatch({type: POST_FETCH_START});

    axios.get("http://localhost:5000/api/posts")
        .then(res => {
            dispatch({
                type: POST_FETCH_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: POST_FETCH_FAILURE,
                payload: err.response.data.message
            });
        });
}
