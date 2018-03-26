import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import moment from 'moment'

const GET_BLOCK = gql`
  query block($index: Int!) {
    block(index: $index) {
      index
      time
      transactions {
        type
        id
      }
    }
  }
`

const Block = ({ match }) => {
  return (
    <div className="Block">
      <Query query={GET_BLOCK} variables={{ index: parseInt(match.params.height, 0) }}>
        {({ loading, error, data }) => {
          if (error) console.log(error)
          if (loading || error) return null

          console.log(data)
          return (
            <div>
              <h2>Block {data.block.index}</h2>
              <h4>{moment(data.block.time).fromNow()}</h4>
              <h3>Transactions</h3>
              <ul>
                {data.block.transactions.map(transaction => (
                  <li key={transaction.id}>
                    {transaction.type} <Link to={`/transaction/${transaction.id}`}>{transaction.id}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default Block
