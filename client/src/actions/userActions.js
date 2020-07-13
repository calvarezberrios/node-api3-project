import axios from "axios";

export const USERS_FETCH_START = "USERS_FETCH_START";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
export const USERS_FETCH_FAILURE = "USERS_FETCH_FAILURE";

export const getUsers = () => dispatch => {
    dispatch({type: USERS_FETCH_START});

    axios.get(`http://localhost:5000/api/users/`)
        .then(res => {
            dispatch({
                type: USERS_FETCH_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: USERS_FETCH_FAILURE,
                payload: err.response.data.message
            });
        })
}
