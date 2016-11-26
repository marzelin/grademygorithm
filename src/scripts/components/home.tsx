import * as firebase from 'firebase'
import * as React from 'react'

interface PropTypes {}
interface StateTypes {}

class Home extends React.PureComponent<PropTypes, StateTypes> {
  render() {
    return (
      <div className="hero">
        <div className="hero__logo">(A+)</div>
        <h1 className="hero__title">Grade My (al)Gorithms</h1>
        <p className="hero__description">Find out how good your algorithm is and learn new tricks by grading other people's solutions</p>
        <div className="hero__buttons">
          <button className="hero__button"><a href="/dashboard" onClick={this.signIn}>Sign In</a></button>
        </div>
      </div>
    )
  }

  signIn = (e: any) => {
    e.preventDefault()
    const githubProvider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithPopup(githubProvider).catch((error) => console.log(error))
  }
}

export {
  Home,
  Home as default
}