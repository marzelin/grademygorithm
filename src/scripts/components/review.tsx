import * as firebase from 'firebase'
import * as React from 'react'
import { ISolution } from '../models'

interface PropTypes {}
interface StateTypes {
  reviewedSolutionId?: string | null 
}

class Review extends React.PureComponent<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <h1>{this.state.reviewedSolutionId}</h1>
    )
  }
  componentDidMount() {
    // find solution to review
    const userId = (firebase.auth().currentUser as firebase.User).uid
    firebase.database().ref('solutions').orderByChild('reviewsNeeded').startAt(1).once('value', (snap) => {
      let reviewedSolutionId: string | null = null
      snap.forEach((solutionSnap) => {
        const solution: ISolution = solutionSnap.val()
        if (solution.authorId !== userId && (!solution.reviewersIds || solution.reviewersIds[userId] === undefined)) {
          reviewedSolutionId = solutionSnap.key as string
          return true
        }
        return false
      })

      this.setState({
        reviewedSolutionId
      })
    })
  }
}

export {
  Review,
  Review as default
}