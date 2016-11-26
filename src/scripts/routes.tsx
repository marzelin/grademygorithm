import * as React from 'react'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { AddSolution } from './components/add-solution'
import { App } from './components/app'
import { Dashboard } from './components/dashboard'
import { Home } from './components/home'
import { Info } from './components/info'
import { Review } from './components/review'
import { Solution } from './components/solution'
import { Solutions } from './components/solutions'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/solutions" component={Solutions}/>
      <Route path="/solution/:solutionId" component={Solution}/>
      <Route path="/add-solution" component={AddSolution}/>
      <Route path="/review" component={Review}/>
      <Route path="/info" component={Info}/>
    </Route>
  </Router>
)

export {
  routes,
  routes as default
}