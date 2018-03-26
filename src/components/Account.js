import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const GET_ACCOUNT = gql`
  query account($address: String!) {
    account(address: $address) {
      address
      scriptHash
      balances {
        asset {
          name
        }
        value
      }
    }
  }
`

const Account = ({ match }) => (
  <div className="Account">
    <Query query={GET_ACCOUNT} variables={{ address: match.params.address }}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error!: ${error}`
        console.log(data)
        return (
          <div>
            <h2>Account</h2>
            <h3>Address: {data.account.address}</h3>
            {data.account.balances.map((balance, i) => <Balance key={i} {...balance} />)}
          </div>
        )
      }}
    </Query>
  </div>
)

const Balance = ({ asset, value }) => (
  <li>
    {value} {asset.name === 'NEO' ? 'VRS' : 'VRC'}
  </li>
)

export default Account
