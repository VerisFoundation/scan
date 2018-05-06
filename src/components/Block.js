import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import moment from 'moment'
import Address from './Address'

const GET_BLOCK = gql`
  query block($index: Int!) {
    block(index: $index) {
      index
      hash
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
          if (data.block) {
            return (
              <div>
                <h2>Block {data.block.index}</h2>
                <h3>
                  <Address>{data.block.hash}</Address>
                </h3>
                <h4>
                  {moment(data.block.time).format('MMMM Do YYYY, h:mm:ss a')} ({moment(data.block.time).fromNow()})
                </h4>
                <h3>Transactions</h3>
                <ul>
                  {data.block.transactions.map(transaction => (
                    <li key={transaction.id}>
                      {transaction.type}{' '}
                      <Link to={`/transaction/${transaction.id}`}>
                        <Address>{transaction.id}</Address>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          } else {
            return (
              <div className="error">
                <h2>Block not found</h2>
                <figure>
                  <span role="img" aria-label="Sad Day">
                    😞
                  </span>
                </figure>
              </div>
            )
          }
        }}
      </Query>
    </div>
  )
}

export default Block
