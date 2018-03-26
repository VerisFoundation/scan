import React from 'react'
import RecentBlocks from './RecentBlocks'
import RecentTransactions from './RecentTransactions'

const Home = () => (
  <div className="Home">
    <RecentTransactions />
    <RecentBlocks />
  </div>
)

export default Home
