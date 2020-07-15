import axios from "axios";

export const USERS_FETCH_START = "USERS_FETCH_START";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
export const USERS_FETCH_FAILURE = "USERS_FETCH_FAILURE";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = "CREATE_USER";

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

export const editUser = user => dispatch => {
    axios.put(`http://localhost:5000/api/users/${user.id}`, user)
        .then(() => {
            dispatch({
                type: EDIT_USER,
                payload: user
            });
        })
        .catch(err => {
            dispatch({
                type: USERS_FETCH_FAILURE,
                payload: err.response.data.message
            });
        });
} 

export const removeUser = id => dispatch => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
        .then(() => {
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        })
        .catch(err => {
            dispatch({
                type: USERS_FETCH_FAILURE,
                payload: err.response.data.message
            });
        });
}

export const createUser = user => dispatch => {
    axios.post("http://localhost:5000/api/users", user)
        .then(res => {
            dispatch({
                type: CREATE_USER,
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
