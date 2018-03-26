import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => (
  <div>
    <h1>
      <Link to="/">VRS Blockchain</Link>
    </h1>
    {children}
    <footer>
      <p>
        <a href="https://www.verisfoundation.com/">Veris.</a>
      </p>
    </footer>
  </div>
)

export default Layout
