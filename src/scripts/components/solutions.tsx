import * as firebase from 'firebase'
import * as React from 'react'
import { Link } from 'react-router'
import { challenges } from '../challenges'
import { ISolution } from '../models'

interface INotSubmitted {
  challengeNo: number
  challengeName: string
}

interface IGradingInProgress extends INotSubmitted {
  progress: number
}

interface INewGraded extends INotSubmitted {
  solutionId: string
}

interface IOldGraded extends INewGraded {
  grade: number
}

interface PropTypes {}
interface StateTypes {
  notSubmitted: INotSubmitted[]
  gradingInProgress: IGradingInProgress[]
  newGraded: INewGraded[]
  oldGraded: IOldGraded[]
}

class Solutions extends React.PureComponent<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)
    this.state = {
      notSubmitted: [],
      gradingInProgress: [],
      newGraded: [],
      oldGraded: []
    }
  }
  
  render() {
    return (
      <div className="grades">
        <h1>Solutions New Graded</h1>
        { this.state.newGraded.map((s) => <Link key={s.challengeNo} to={`/solution/${s.solutionId}`}>{s.challengeNo}. {s.challengeName}</Link>)}
        <h1>Solutions Old Graded</h1>
        { this.state.oldGraded.map((s) => <Link key={s.challengeNo} to={`/solution/${s.solutionId}`}>{s.challengeNo}. {s.challengeName}</Link>)}
        <h1>Solutions Being Graded</h1>
        { this.state.gradingInProgress.map((s) => s.challengeName)}
        <h1>Challenges</h1>
        {this.state.notSubmitted.map((s) => <p key={s.challengeNo}>{s.challengeNo}. {s.challengeName}</p>)}
      </div>
    )
  }

  componentDidMount() {
    const userId = (firebase.auth().currentUser as firebase.User).uid
    firebase.database().ref('solutions').orderByChild('authorId').equalTo(userId).once('value', (snap) => {
      const submittedNo: number[] = []
      const gradingInProgress: IGradingInProgress[] = []
      const newGraded: INewGraded[] = []
      const oldGraded: IOldGraded[] = []
      snap.forEach((solutionSnapshot) => {
        const solution: ISolution = solutionSnapshot.val()
        const solutionId = solutionSnapshot.key as string
        const { grade, challengeId } = solution
        submittedNo.push(challengeId)
        const challengeNo = challengeId + 1
        const challengeName = challenges[challengeNo]
        if(grade === undefined) {
          const { reviewsNeeded } = solution
          if (reviewsNeeded > 2) {
            newGraded.push({
              challengeName,
              challengeNo,
              solutionId
            })
          } else {
            const progress = Math.floor((1 - reviewsNeeded / 3) * 100)
            gradingInProgress.push({
              challengeName,
              challengeNo,
              progress
            })            
          }
        } else {
          oldGraded.push({
            challengeName,
            challengeNo,
            grade,
            solutionId
          })
        }
        return false
      })

      const notSubmitted: INotSubmitted[] = challenges
        .reduce((acc, challengeName, challengeNo) => {
          if (submittedNo.indexOf(challengeNo) === -1) {
            return [...acc, {
              challengeName,
              challengeNo
            }]
          }
          return acc
        }, ([] as INotSubmitted[]))
      
      this.setState({
        notSubmitted,
        gradingInProgress,
        newGraded,
        oldGraded
      } as StateTypes)
    })
  }
}

export {
  Solutions,
  Solutions as default
}