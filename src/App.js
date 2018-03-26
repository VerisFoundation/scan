import React from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import Block from './components/Block'
import Transaction from './components/Transaction'
import Account from './components/Account'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/block/:height" component={Block} />
        <Route path="/transaction/:txid" component={Transaction} />
        <Route path="/address/:address" component={Account} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  </Router>
)

export default App
