export interface profileSliceType {
  _id: string
  firstName: string
  lastName: string
  profilePicture: string | undefined
  email: string
  username: string
  following: []
  followers: []
  blocked: []
  posts: []
  upvotedPosts: []
  downvotedPosts: []
  savedPosts: []
  authorizedPosts: []
  notifications: []
  comments: []
}
