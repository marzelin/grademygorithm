import * as firebase from 'firebase'
import * as React from 'react'
import {ISolutionDetails} from '../models'
import { challenges } from '../challenges'

interface PropsTypes {
  params: any
}
interface StateTypes {
  solution?: ISolutionDetails
}

class Solution extends React.PureComponent<PropsTypes, StateTypes> {
  constructor(props: PropsTypes) {
    super(props)
    this.state = {
    }
  }
  render() {
    const {solution} = this.state 
    if (!solution) {
      return <h1>Loading...</h1>
    }
    const {challengeId, code, reviews} = solution
    const reviewsAll: any = {
      clarity: [],
      simplicity: [],
      ingenuity: [],
      pros: [],
      cons: []
    }
    Object.keys(reviews).forEach((reviewKey) => {
      const review: any = reviews[reviewKey]
      Object.keys(review).forEach((prop) => reviewsAll[prop].push(review[prop]))
    })

    const challengeName = challenges[challengeId]
    return (
      <div className="challenge">
        <h1 className="challenge__title">{challengeName}</h1>
        <pre className="challenge__codeblock">
          {code}
        </pre>
        <div className="challenge__grades">
          <h2 className="challenge__grades-title">Grades</h2>
          {['clarity', 'simplicity', 'ingenuity'].map((categoryName) => 
            <p className="challenge__category" key={categoryName}>{categoryName}: {reviewsAll[categoryName].map((grade: number, i: number) => <span key={i} className="challenge__grade">{grade}</span>)}</p>
          )}
        </div>
        <div className="endorsements">
          <h2 className="endorsements__title">Endorsements</h2>
          {reviewsAll.pros.map((p: string) => <p key={p} className="endorsement">{p}</p>)}
        </div>
        <div className="improvements">
          <h2 className="improvements__title">Improvement ideas</h2>
          {reviewsAll.cons.map((p: string) => <p key={p} className="improvements__idea">{p}</p>)}
        </div>
      </div>
    )
  }

  componentDidMount() {
    firebase.database().ref('solutionsDetails/' + this.props.params.solutionId).once('value', (snap) => {
      const grades: number[] = []
      snap.child('reviews').forEach((reviewSnap) => {
        const review = reviewSnap.val()
        ;['clarity', 'simplicity', 'ingenuity'].forEach((name) => grades.push(review[name]))
        return false
      })
      const grade = Math.round(grades.reduce((sum, cur) => sum + cur) / grades.length)
      firebase.database().ref('solutions/' + this.props.params.solutionId + '/grade').set(grade)
      this.setState({
        solution: snap.val()
      })
    })
  }
}

export {
  Solution,
  Solution as default
}