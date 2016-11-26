import * as firebase from 'firebase'
import * as React from 'react'
import {challenges } from '../challenges'

interface NotSubmittedChallenge {challengeId: number, challengeName: string}
interface PropTypes {
  router: any
}
interface StateTypes {
  notSubmitted: NotSubmittedChallenge[]
}

class AddSolution extends React.PureComponent<PropTypes, StateTypes> {
  private _code: HTMLTextAreaElement
  private _notes: HTMLTextAreaElement
  private _challengeId: HTMLSelectElement
  constructor(props: PropTypes) {
    super(props)
    this.state = {
      notSubmitted: []
    }
  }
  render() {
    return (
      <div className="algorithm-submission">
        <h1 className="algorithm-submission__title">Add Solution</h1>
        <div className="algorithm-submission__field">
          <label htmlFor="challenge">Choose challenge:</label>
          <select
            ref={(ref) => this._challengeId = ref}
            className="algorithm-submission__selection"
            id="challenge">
            {this.state.notSubmitted.map(({challengeId, challengeName}) => {
              return <option key={challengeId} value={challengeId}>{challengeName}</option>
            })}
          </select>
        </div>
        <div className="algorithm-submission__field">
          <label htmlFor="code">Paste your code:</label>
          <textarea
            className="algorithm-submission__codeblock"
            id="code"
            ref={(ref) => this._code = ref}
            cols={35}
            rows={10}
            placeholder="your code goes here" ></textarea>
        </div>
        <div className="algorithm-submission__field">
          <label htmlFor="notes">Optional notes:</label>
          <textarea
            ref={(ref) => this._notes = ref}
            cols={35}
            rows={4}
            className="algorithm-submission__notes" ></textarea>
        </div>
        <div className="algorithm-submission__field">
          <button className="algorithm-submission__submit-btn"><a href="" onClick={this.addSolution}>Submit</a>
          </button>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const userId = (firebase.auth().currentUser as firebase.User).uid
    firebase.database().ref('solutions').orderByChild('authorId').equalTo(userId).once('value', (snap) => {
      const submitted: number[] = []
      snap.forEach((solution) => {
        submitted.push(solution.val().challengeId)
        return false
      })
      this.setState({
        notSubmitted: challenges.reduce((acc, challengeName, challengeId) => {
          if(submitted.indexOf(challengeId) === -1) {
            acc.push({
              challengeName,
              challengeId
            })
          }
          return acc
        }, [] as NotSubmittedChallenge[])
      })
    })
  }

  addSolution = (e: any) => {
    e.preventDefault()
    const authorId = (firebase.auth().currentUser as firebase.User).uid
    const challengeId = parseInt(this._challengeId.value)
    const newReviewRef = firebase.database().ref('solutionsDetails').push()
    newReviewRef.set({
      authorId,
      challengeId,
      code: this._code.value,
      notes: this._notes.value || null
    })
    firebase.database().ref('solutions/' + newReviewRef.key).set({
      authorId,
      challengeId,
      reviewsNeeded: 3
    })
    this.props.router.replace('/')
  }
}

export {
  AddSolution,
  AddSolution as default
}