export const calculateRating = (upvotes: number, downvotes: number): number => {
  if (upvotes === 0 || downvotes > upvotes) {
    return 0
  }

  const totalVotes = upvotes + downvotes
  const ratingPercentage = (upvotes / totalVotes) * 100
  return Math.round(ratingPercentage)
}
