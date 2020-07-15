import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getUsers } from "../actions/userActions";
import UserCard from "./UserCard";
import styled from "styled-components";
import UserPage from './UserPage';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const MainContent = props => {
    const { users } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();

    useEffect(() => dispatch(getUsers()), [dispatch]);

    useEffect(() => {
        props.setPageTitle("All Users");
    }, [props]);

    return (
        <Router>
            <Container>
                <Route exact path = {`/users`}>
                    {users.map(user => (
                        <UserCard key = {user.id} {...user} />
                    ))}
                </Route>
                <Route path = {`/users/:id`} render = {p => (
                    <UserPage setPageTitle = {props.setPageTitle} {...p} />
                )} />
            </Container>
        </Router>
    );
};

export default MainContent;