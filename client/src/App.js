import React, { useEffect } from 'react';
import './App.css';
import { Route, Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from "./actions/userActions";
import UserPage from './components/UserPage';

function App() {
  const { users } = useSelector(state => state.usersReducer);
  const { posts } = useSelector(state => state.postsReducer);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getUsers()), [dispatch]);

  return (
    <div className="App">
      <Route exact path = "/">
        <Redirect to = "/users" />
      </Route>

      <Route exact path = "/users">
        <h1>Users Api</h1>
        {users.map(user => (
          <li key = {user.id}><Link to = {`/users/${user.id}`}>{user.name}</Link></li>
        ))}
      </Route>

      <Route path = "/users/:id" component = {UserPage} />
    </div>
  );
}

export default App;
