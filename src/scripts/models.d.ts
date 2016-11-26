interface ISolution {
  authorId: string
  challengeId: number
  reviewsNeeded: number
  reviewersIds?: {
    [reviewerId: string]: Grade
  }
  grade?: Grade
}

interface ISolutions {
  [solutionId: string] : ISolution
}

interface ISolutionDetails {
  authorId: string
  code: string
  notes?: string
  grade?: Grade
  challengeId: number
  reviews: {
    [reviewId: string]: {
      clarity: Grade
      ingenuity: Grade
      simplicity: Grade
      pros: string
      cons: string
    }
  }
}

interface ISolutionsDetails {
  [solutionId: string]: ISolutionDetails
}

type Grade = 1 | 2 | 3 | 4 | 5

export {
  ISolutions,
  ISolution,
  ISolutionsDetails,
  Grade
}