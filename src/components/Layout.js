import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'

const Layout = ({ children }) => (
  <div className="layout">
    <header>
      <div className="wrap">
        <h1>
          <Link to="/">
            <img src={logo} alt="Veris Logo" height="40" />
          </Link>
        </h1>
      </div>
    </header>
    <main>
      <div className="wrap">{children}</div>
    </main>
    <footer>
      <div className="wrap">
        <p>
          &copy; 2018 <a href="https://www.verisfoundation.com/">Veris Foundation</a>. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
)

export default Layout
