export const calculateRating = (upvotes: number, downvotes: number): number => {
  if (upvotes === 0 || downvotes > upvotes) {
    return 0
  }

  const totalVotes = upvotes + downvotes
  const ratingPercentage = (upvotes / totalVotes) * 100
  return Math.round(ratingPercentage)
}

export const getPFPPublicId = (url: string) => {
  const extension = ".jpg"
  const extensionIndex = url.lastIndexOf(extension)

  if (extensionIndex !== -1) {
    const slashIndex = url.lastIndexOf("/", extensionIndex)

    if (slashIndex !== -1) {
      const id = url.substring(slashIndex + 1, extensionIndex)
      return id
    }
  }

  return null
}
