import * as firebase from 'firebase'
import * as React from 'react'
import { Link } from 'react-router'
import { ISolution, ISolutionDetails } from '../models'
import { challenges } from '../challenges'

interface PropTypes {
  router: any
}
interface StateTypes {
  reviewedSolutionId?: string | null 
  solution?: ISolutionDetails
  isFormCompleted?: boolean
}

class Review extends React.PureComponent<PropTypes, StateTypes> {
  private _form: any
  constructor(props: PropTypes) {
    super(props)
    this.state = {}
  }
  render() {
    const {solution, reviewedSolutionId} = this.state
    if (reviewedSolutionId === null) {
      return <h1>Currently there is no algorithm to grade.<br/>
            Check back later.<br/>
            <Link to="/dashboard">Dashboard</Link></h1>
    }
    if (!solution) {
      return <h1>Searching for Algorithm to Grade...</h1>
    }
    const grades = [1,2,3,4,5]
    const categories = ['clarity', 'simplicity', 'ingenuity']
    return (
      <form className="assessment" onSubmit={this.submit} ref={(ref) => this._form = ref}>
        <h1 className="assessment__title">Grade Solution</h1>
        <h2 className="assessment__challenge-title">{challenges[solution.challengeId]}</h2>
        <pre className="assessment__codeblock">
          {solution.code}
        </pre>
        <div className="assessment__categories">
          <h2 className="categories__title">Rate it</h2>
          { categories.map((categoryName) => 
            <p className="assessment__category-title">{categoryName}:
              <span className="grade-group">
                {grades.map((grade) => 
                  <label htmlFor={categoryName + grade} className="assessment__grade" ><input type="radio" name={categoryName} id={categoryName + grade} value={grade} />{grade}</label>
                )}
              </span>
            </p>
          )}
        </div>
        <div className="endorsement">
          <h2 className="endorsements__title">What do you like about this solution?</h2>
          <textarea
            name="pros"
            className="assessment__notes"
            cols={35}
            rows={4}></textarea>
        </div>
        <div className="improvements">
          <h2 className="improvements__title">How this code can be improved?</h2>
          <textarea
            name="cons"
            className="assessment__notes"
            cols={35}
            rows={4}></textarea>
        </div>
        <input type="submit" className="assessment__submit-btn" value="Submit"/>
        {(this.state.isFormCompleted === false) ? <h2>All fields are required</h2> : null}
      </form>
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
      firebase.database().ref('solutionsDetails/' + reviewedSolutionId ).once('value', (snap) => {
        const solution = snap.val()
        this.setState({
          solution
        })
      })
    })
  }

  submit = (e: any) => {
    const {reviewedSolutionId} = this.state
    e.preventDefault()
    if (this.isFormCompleted()) {
      let { clarity, simplicity, ingenuity, pros, cons } = this._form
      ;[clarity, simplicity, ingenuity] = [clarity, simplicity, ingenuity].map((prop) => parseInt(prop.value))
      ;[pros, cons] = [pros, cons].map((prop) => prop.value)
      const userId = (firebase.auth().currentUser as firebase.User).uid
      firebase.database().ref('solutions/' + reviewedSolutionId + '/reviewsNeeded').transaction((currentReviewsNeeded) => currentReviewsNeeded - 1 )
      firebase.database().ref('solutions/' + reviewedSolutionId + '/reviewersIds/' + userId).set(
        Math.round((parseInt(clarity) + parseInt(simplicity) + parseInt(ingenuity)) / 3)
      )
      firebase.database().ref('solutionsDetails/' + reviewedSolutionId + '/reviews/' + userId).set({ clarity, simplicity, ingenuity, pros, cons })
      this.props.router.replace('/')
    }
  } 

  isFormCompleted = () => {
    const isFormCompleted = !!(this._form.clarity.value && this._form.simplicity.value && this._form.ingenuity.value && this._form.pros.value && this._form.cons.value)
    this.setState({
      isFormCompleted
    })
    return isFormCompleted
  }
}

export {
  Review,
  Review as default
}