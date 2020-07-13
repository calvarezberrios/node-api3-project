import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';

const UserPage = ({ match }) => {
    const { id } = match.params;
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

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
    }, [dispatch]);

    if(!user) return <h2>Loading User Data...</h2>
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Posts</h3>
            {user.posts && user.posts.map(post => (
                <p key = {post.id}>{post.text}</p>
            ))}
        </div>
    );
};

export default UserPage;