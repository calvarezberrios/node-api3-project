import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";

import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

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
        width: "93%",
    }
}));


const UserPage = ({ setPageTitle, match }) => {
    const classes = useStyles();
    const { id } = match.params;
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [newPost, setNewPost] = useState({text: ""});

    const handleChange = e => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }

    useEffect(() => {
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
            })
    }, [dispatch, id]);

    useEffect(() => {
        setPageTitle(user ? `${user.name}'s Quotes` : `User's Quotes`);
    }, [user, setPageTitle]);

    if (!user) return <h2>Loading User Data...</h2>;
    return (
        <List className={classes.root}>
            {user.posts && user.posts.map((post, index) => (
                <>
                <ListItem alignItems="flex-start" className = {classes.post}>
                    <ListItemAvatar>
                        <Avatar alt={user.name} src={user.id} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={post.text}
                    />
                </ListItem>
                {index < user.posts.length - 1 && <Divider variant="inset" component="li" />}
                </>
            ))}
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
            <Button variant = "contained">Submit</Button>
            
        </List>
    );
};

export default UserPage;