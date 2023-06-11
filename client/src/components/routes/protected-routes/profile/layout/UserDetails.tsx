import { useTypedSelector } from "../../../../../lib/hooks/redux-hook/useTypedSelector"

const UserDetails = () => {
  const { username, firstName, lastName } = useTypedSelector(
    (state) => state.profile
  )

  console.log(username, firstName, lastName)
  return <div>UserDetails</div>
}

export default UserDetails
