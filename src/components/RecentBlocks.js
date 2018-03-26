import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import moment from 'moment'

const GET_RECENT_BLOCKS = gql`
  query {
    blocks(limit: 10) {
      index
      time
      transactions {
        id
      }
    }
  }
`

const RecentBlocks = () => (
  <div className="RecentBlocks">
    <h2>Recent Blocks</h2>
    <Query query={GET_RECENT_BLOCKS}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error :(</div>
        return (
          <table>
            <thead>
              <tr>
                <th>Height</th>
                <th>Transactions</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.blocks.map(block => (
                <tr key={block.index}>
                  <td>
                    <Link to={`/block/${block.index}`}>{block.index}</Link>
                  </td>
                  <td>{block.transactions.length}</td>
                  <td>{moment(block.time).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }}
    </Query>
  </div>
)

export default RecentBlocks
