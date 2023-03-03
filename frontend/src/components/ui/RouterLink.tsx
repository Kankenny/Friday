import { Link } from "react-router-dom";

type Props = {
  to: string;
  routerLinkText: string;
};

const RouterLink = ({ to, routerLinkText }: Props) => {
  return (
    <Link to={to} className=" text-secondary py-2 px-4">
      {routerLinkText}
    </Link>
  );
};

export default RouterLink;
