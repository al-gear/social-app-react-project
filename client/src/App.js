import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';





function App() {


  return (
    <Router>
      <div className="container-fluid">
        <Header />

        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
        </Switch>
      </div>
    </Router>



  )
}

export default App
