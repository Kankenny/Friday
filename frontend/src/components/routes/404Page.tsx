import Overview from "../ui/Overview"
import RouterLink from "../ui/RouterLink"

const PageNotFound = () => {
  return (
    <Overview twClasses="h-40">
      <h1 className="text-xl font-bold">404 Error: Page Not Found!</h1>
      <p className="text-xs">
        It looks like you accessed a non-existent URL. Click{" "}
        <RouterLink to="/" routerLinkText="here" /> to go back to the landing
        page.
      </p>
    </Overview>
  )
}

export default PageNotFound
