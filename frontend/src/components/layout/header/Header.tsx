import RouterDiv from "../../ui/RouterDiv";
import RouterLink from "../../ui/RouterLink";

const Header = () => {
  return (
    <header className="bg-secondary flex justify-between items-center px-4 py-4 rounded-b-lg">
      <RouterDiv to={"/"}>friday</RouterDiv>
      <nav className="space-x-4">
        <RouterLink to="/app" routerLinkText="App" />
        <RouterLink to="/playground" routerLinkText="Playground" />
      </nav>
    </header>
  );
};

export default Header;
