import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import moment from 'moment'
import Address from './Address'

const GET_RECENT_TRANSACTIONS = gql`
  query {
    transactions(limit: 10, types: ["ContractTransaction", "ClaimTransaction"]) {
      type
      id
      block {
        time
      }
    }
  }
`

const RecentTransactions = () => (
  <div className="RecentTransactions">
    <h2>Recent Transactions</h2>
    <Query query={GET_RECENT_TRANSACTIONS}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error :(</div>
        return (
          <table className="transactions">
            <thead>
              <tr>
                <th className="type">Type</th>
                <th className="txid">Transaction ID</th>
                <th className="time">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="type">{tx.type.replace('Transaction', '')}</td>
                  <td className="txid">
                    <Link to={`/transaction/${tx.id}`}>
                      <Address>{tx.id}</Address>
                    </Link>
                  </td>
                  <td className="time">{moment(tx.block.time).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }}
    </Query>
  </div>
)

export default RecentTransactions
