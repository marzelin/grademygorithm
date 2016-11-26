import * as React from 'react'

interface PropsTypes {}
interface StateTypes {}

class Info extends React.PureComponent<PropsTypes, StateTypes> {
  render() {
    return (
      <div>
        <h1>Info</h1>
        <p>Mobile-friendly site for grading your algorithms</p>
        <h2>Features</h2>
        <p>User Authentiation</p>
        <p>Persistent Storage</p>
        <p>Client-side routing</p>
        <h2>Technologies</h2>
        <p>React + React-Router</p>
        <p>Firebase</p>
        <h2><a href="https://github.com/marzelin/grademygorithm" className="grades__challenge--active">Project Code on Github</a></h2>
      </div>
    )
  }
}

export {
  Info,
  Info as default
}