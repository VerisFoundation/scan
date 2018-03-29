import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from './App'
import './index.css'

const client = new ApolloClient({ uri: 'http://ico.verisfoundation.com:5000/graphql' })

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(<ApolloApp />, document.getElementById('root'))
