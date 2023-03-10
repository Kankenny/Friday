type Props = {
  href: string;
  linkText: string;
  [key: string]: any;
};

const StyledLink = ({ href, linkText, ...rest }: Props) => {
  return (
    <a
      href={href}
      className="underline text-tertiary hover:duration-200 ease-in-out hover:text-secondary"
      {...rest}
    >
      {linkText}
    </a>
  );
};

export default StyledLink;
