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
        <h1 className="grades__title">Your grades</h1>
        <div className="grades__group">
          <h2 className="grades__group-title">Graded Algorithms</h2>
          { this.state.newGraded.map((s) => <p key={s.challengeNo} className="grades__challenge--active">
            <Link to={`/solution/${s.solutionId}`}>{s.challengeNo}. {s.challengeName}<span className="grades__grade">New</span></Link>
          </p>)}
          { this.state.oldGraded.map((s) => <p key={s.challengeNo} className="grades__challenge--active">
            <Link to={`/solution/${s.solutionId}`}>{s.challengeNo}. {s.challengeName}<span className="grades__grade">{s.grade}</span></Link>
          </p>)}
        </div>
        <div className="grades__group">
          <h2 className="grades__group-title">Algorithms Being Graded</h2>
          { this.state.gradingInProgress.map((s) => 
            <p key={s.challengeNo} className="grades__challenge">{s.challengeNo}. {s.challengeName} (Grading Progress: {s.progress}%)</p>
          )}
        </div>
        <div className="grades__group">
          <h2 className="grades__group-title">Algorithms Not Submitted Yet</h2>
          { this.state.notSubmitted.map((s) =>
            <p key={s.challengeNo} className="grades__challenge">{s.challengeNo}. {s.challengeName}</p>
          )}
        </div>
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
        const challengeName = challenges[challengeId]
        const challengeNo = challengeId + 1
        if(grade === undefined) {
          const { reviewsNeeded } = solution
          if (reviewsNeeded < 1) {
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
        .reduce((acc, challengeName, challengeId) => {
          if (submittedNo.indexOf(challengeId) === -1) {
            return [...acc, {
              challengeName,
              challengeNo: challengeId + 1
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