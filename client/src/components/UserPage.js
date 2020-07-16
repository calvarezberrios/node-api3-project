import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from "@material-ui/core/TextField";

import Axios from 'axios';
import { Button } from '@material-ui/core';
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    input: {
        width: "90%",
    },
    post: {
        display: "flex",
        alignItems: "center",
    }
}));

const UserPage = ({ setPageTitle, match }) => {
    const classes = useStyles();
    const { id } = match.params;
    const [user, setUser] = useState();
    const [newPost, setNewPost] = useState({text: ""});    
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = e => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }

    

    const submitPost = e => {
        e.preventDefault();

        if(newPost.text){
            Axios.post(`http://localhost:5000/api/users/${id}/posts`, newPost)
                .then(res => {
                    setUser({
                        ...user,
                        posts: [...user.posts, res.data]
                    });
                })
                .catch(err => {
                    console.log(err.response.data.message);
                });
            
                setNewPost({text: ""});
        }
    }

    
    useEffect(() => {
        setPageTitle(user ? `${user.name}'s Quotes` : `User's Quotes`);
    }, [user, setPageTitle]);

    const getUserData = () => {
        Axios.get(`http://localhost:5000/api/users/${id}`)
            .then(res => {
                Axios.get(`http://localhost:5000/api/users/${id}/posts`)
                    .then(posts => {
                        setUser({
                            ...res.data,
                            posts: posts.data
                        });
                    })
                    .catch(err => console.log(err.response.data.message));
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        getUserData();
    }, [isEditing]);

    if (!user) return <h2>Loading User Data...</h2>;
    return (
        <List className={classes.root}>
            {user.posts && user.posts.map((post, index) => <Post user = {user} post = {post} index = {index} key = {post.id} setUser = {setUser} setIsEditing = {setIsEditing} />)}
            <TextField 
                id = "postText"
                className = {classes.input}
                type = "text"
                name = "text"
                label = "New Quote"
                value = {newPost.text}
                onChange = {handleChange}
                multiline
                variant = "outlined"
            />{" "}
            <Button variant = "contained" onClick = {submitPost}>Submit</Button>            
        </List>
    );
};

export default UserPage;