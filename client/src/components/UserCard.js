import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import InputIcon from '@material-ui/icons/Input';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import { useDispatch } from 'react-redux';
import { editUser, removeUser } from "../actions/userActions";
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 300,
        height: 200,
        margin: 12,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: "75%",
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default function MediaControlCard(props) {
    const classes = useStyles();

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({id: props.id, name: props.name});
    const dispatch = useDispatch();
    const { push } = useHistory(); 

    const saveChanges = () => {
        
        dispatch(editUser(user));
        setIsEditing(false);

    }

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const deleteUser = () => {
        dispatch(removeUser(props.id));
    }

    
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                title="Profile pic"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    {!isEditing ? (
                        <Typography component="h5" variant="h5">
                            {props.name}
                        </Typography>
                    ) : (
                        <TextField 
                            id = "name"
                            type = "text"
                            name = "name"
                            label = "User's Name"
                            value = {user.name}
                            onChange = {handleChange}
                            multiline
                        />
                    )}
                    <Typography variant="subtitle1" color="textSecondary">
                        User Id: {props.id}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="edit" onClick = {() => !isEditing ? setIsEditing(true) : saveChanges()}>
                        {!isEditing ? <EditIcon /> : <InputIcon /> }
                    </IconButton>
                    <IconButton aria-label="view details" onClick = {() => push(`/users/${props.id}`)}>
                        <MenuBookIcon className={classes.playIcon} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick = {deleteUser}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
            
        </Card>
    );
}
