import * as React from 'react'
import { Link } from 'react-router'

interface PropTypes {}
interface StateTypes {}

class Dashboard extends React.PureComponent<PropTypes, StateTypes> {
  render() {
    return (
      <div className="hero">
        <h1 className="hero__title">Main Menu</h1>
        <div className="hero__buttons">
          <button className="hero__button"><Link to="/add-solution">Add Solution</Link></button>
          <button className="hero__button"><Link to="/solutions">Check grades</Link></button>
          <button className="hero__button"><Link to="/review">Grade others</Link></button>
        </div>
      </div>
    )
  }
}

export {
  Dashboard,
  Dashboard as default
}