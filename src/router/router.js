import { Switch, Route } from "react-router-dom";
import React from 'react'
import Room from '../components/Room/index'
import Login from '../components/Login/index'

export default class RouteMap extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Room" component={Room}/>
      </Switch>
    )
  }
}