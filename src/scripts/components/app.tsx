import * as firebase from 'firebase'
import * as React from 'react'
import { Link } from 'react-router'
import { CONFIG } from '../firebase-config'

interface StateTypes {
  currentUser?: firebase.User | null
}
interface PropTypes {
  router: ReactRouter.InjectedRouter
  location: {pathname: string}
}

class App extends React.PureComponent<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate({location}: {location: {pathname: string}}, {currentUser}: {currentUser?: firebase.User | null}) {
    if (currentUser === null && !(location.pathname === '/' || location.pathname === '/info')) {
      this.props.router.push('/')
      return false
    }

    if (currentUser && location.pathname === '/') {
      this.props.router.replace('/dashboard')
      return false
    }
    return true
  }

  render() {
    const { currentUser }  =  this.state
    if (currentUser === undefined) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <nav className="main-nav">
          <div className="main-nav__logo"><Link to="/">GradeMyGorithms</Link></div>
          <ul className="main-nav__links">
            <li className="main-nav__link">
              <Link to="/info">
                Info
              </Link>
            </li>
            <li className="main-nav__link">
              <a href="#" onClick={currentUser? this.signOut: this.signIn}>
                Sign {currentUser? 'Out': 'In'}
              </a>
            </li>
          </ul>
        </nav>
        { this.props.children }
      </div>
    )
  }

  componentDidMount() {
    firebase.initializeApp(CONFIG)
    firebase.auth().onAuthStateChanged((maybeUser: firebase.User | null) => {
      this.setState({
        currentUser: maybeUser
      })
    })
  }

  signIn = (e: any) => {
    e.preventDefault()
    const githubProvider = new firebase.auth.GithubAuthProvider()
    firebase.auth().signInWithPopup(githubProvider).catch((error) => console.log(error))
  }
  signOut = (e: any) => {
    e.preventDefault()
    firebase.auth().signOut()
  }
}

export {
  App,
  App as default
}