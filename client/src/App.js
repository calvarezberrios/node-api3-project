import React from 'react';
import './App.css';
import { Route, Redirect } from "react-router-dom";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="App">
      <SideBar />

      <Route exact path = "/">
        <Redirect to = "/users" />
      </Route>
      
    </div>
  );
}

export default App;
