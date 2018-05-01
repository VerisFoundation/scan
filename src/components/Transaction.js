import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import Address from './Address'

const GET_TRANSACTION = gql`
  query transaction($id: String!) {
    transaction(id: $id) {
      type
      id
      block {
        index
        time
      }
      inputs {
        asset {
          name
        }
        account {
          address
        }
        value
      }
      outputs {
        asset {
          name
        }
        account {
          address
        }
        value
      }
    }
  }
`

const Transaction = ({ match }) => (
  <div className="Transaction">
    <Query query={GET_TRANSACTION} variables={{ id: match.params.txid }}>
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error!: ${error}`
        const tx = data.transaction
        console.log(data)
        return (
          <div>
            <h2>Transaction Information</h2>
            <h3>{tx.type.replace('Transaction', '')} Transaction</h3>
            <h4>
              Hash: <Address>{tx.id}</Address>
            </h4>
            <h4>
              Block: <Link to={`/block/${tx.block.index}`}>{tx.block.index}</Link>
            </h4>
            <table>
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{tx.inputs.map((input, i) => <Output key={i} {...input} />)}</td>
                  <td>{tx.outputs.map((output, i) => <Output key={i} {...output} />)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }}
    </Query>
  </div>
)

const Output = ({ account, asset, value }) => (
  <ul>
    <li>
      <Link to={`/address/${account.address}`}>
        <Address>{account.address}</Address>
      </Link>{' '}
      ({value} {asset.name === 'NEO' ? 'VRS' : 'VRC'})
    </li>
  </ul>
)

export default Transaction
