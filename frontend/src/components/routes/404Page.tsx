import Overview from "../ui/Overview"
import RouterLink from "../ui/RouterLink"

const PageNotFound = () => {
  return (
    <Overview twClasses="my-auto">
      <h1 className="text-xl font-bold">404 Error: Page Not Found!</h1>
      <p className="text-xs">
        It looks like you accessed a non-existent URL. Click{" "}
        <RouterLink
          to="/"
          routerLinkText="here"
          twClasses="text-tertiary hover:text-secondary underline"
        />{" "}
        to go back to the landing page.
      </p>
    </Overview>
  )
}

export default PageNotFound
