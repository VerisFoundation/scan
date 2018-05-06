import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Search extends Component {
  state = {
    redirect: null
  }

  handleSubmit = event => {
    event.preventDefault()
    const query = event.target[0].value
    let redirect = null
    if (isNaN(query)) {
      switch (query.length) {
        case 34:
          redirect = `/address/${query}`
          break
        case 64:
          redirect = `/transaction/${query}`
          break
        default:
          break
      }
    } else {
      redirect = `/block/${query}`
    }

    if (redirect) {
      this.setState({ redirect }, () => {
        this.setState({ redirect: null })
      })
      event.target.reset()
    } else {
      this.setState({ searchError: true })
    }
  }

  handleInput = () => {
    this.setState({ searchError: false })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Block height, Trasaction ID, or Address"
            onInput={this.handleInput}
            className={this.state.searchError ? 'search-error' : null}
          />
          <button type="submit">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#fff"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              />
            </svg>
          </button>
        </form>
      </div>
    )
  }
}

export default Search