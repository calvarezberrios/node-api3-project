import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from "@material-ui/core/TextField";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import Axios from 'axios';


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
    },
    post: {
        display: "flex",
        alignItems: "center",
    }
}));

const ITEM_HEIGHT = 48

const Post = ({ user, post, index, setUser, setIsEditing }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [dialog, setDialog] = useState(false);
    const [value, setValue] = useState({text: post.text});
    

    const toggleDialog = () => {
        setDialog(!dialog);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const editPost = () => {
        handleClose();
        toggleDialog();
        setIsEditing(true);
    }

    const cancelEdit = () => {
        setValue({text: post.text});
        toggleDialog();
        setIsEditing(false);
    }

    const saveChanges = () => {
        if(value.text) {
            Axios.put(`http://localhost:5000/api/posts/${post.id}`, value)
                .then(res => {
                    setUser({
                        ...user,
                        posts: user.posts.map(p => {
                            if(p.id === value.id) {
                                return value;
                            }
                            return p;
                        })
                    })
                    toggleDialog();
                    setIsEditing(false);
                })
                .catch(err => {
                    console.log(err.response.data.message);
                });
        }
    }

    const removePost = () => {
        handleClose();
        setIsEditing(true);
        Axios.delete(`http://localhost:5000/api/posts/${post.id}`)
            .then(res => {
                setUser({
                    ...user,
                    posts: user.posts.filter(p => p.id !== post.id)
                });
                setIsEditing(false);
                
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
    }

    const handlePostChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <ListItem alignItems="flex-start" className = {classes.post}>
                <ListItemAvatar>
                    <Avatar alt={user.name} src="none" />
                </ListItemAvatar>
                <ListItemText
                    primary={post.text}
                />

                <IconButton
                    className = {classes.menuBtn}
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                    }}
                >
                    <MenuItem onClick={editPost}>
                        Edit
                    </MenuItem>
                    <MenuItem onClick={removePost}>
                        Delete
                    </MenuItem>
                </Menu>
            </ListItem>
            {index < user.posts.length - 1 && <Divider variant="inset" component="li" />}

            <Dialog open={dialog} onClose={toggleDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Post/Quote</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Edit your quote here and save changes.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="post"
                    label="Quote Text"
                    type="text"
                    name="text"
                    fullWidth
                    value = {value.text}
                    onChange = {handlePostChange}
                    multiline
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={cancelEdit} color="primary">
                    Cancel
                </Button>
                <Button onClick={saveChanges} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Post;