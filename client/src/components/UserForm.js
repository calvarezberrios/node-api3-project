import React, { useState, useEffect } from 'react';
import {Button, TextField} from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { createUser } from "../actions/userActions";
import { useHistory } from 'react-router';
 
const UserForm = props => {
    const [user, setUser] = useState({ name: "" });
    const dispatch = useDispatch();
    const { push } = useHistory();

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const addUser = e => {
        e.preventDefault();
        
        dispatch(createUser(user));
        setUser({name: ""});
        push("/");
    }

    useEffect(() => {
        props.setPageTitle("Create a User");
    }, [props]);

    return (
        <form onSubmit = {addUser} autoComplete = "off">
            <h3>All you need is a name...</h3>
            <TextField 
                id = "name"
                type = "text"
                name = "name"
                label = "User's Name"
                value = {user.name}
                onChange = {handleChange}
            />
            <br /><br />
            <Button variant = "contained" color = "primary" type = "submit">Add</Button>{" "}
            <Button variant = "contained" color = "primary" onClick = {() => {
                setUser({name: ""}); 
                push("/");
            }}>Cancel</Button>
        </form>
    );
};

export default UserForm;