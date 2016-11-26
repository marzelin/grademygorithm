import * as React from 'react'

interface PropTypes {
  params: any
}
interface StateTypes {}

class Solution extends React.PureComponent<PropTypes, StateTypes> {
  render() {
    return (
      <div>
        Solution {this.props.params.solutionId}
      </div>
    )
  }
}

export {
  Solution,
  Solution as default
}