type Props = {
  href: string;
  linkText: string;
};

const StyledLink = ({ href, linkText }: Props) => {
  return (
    <a
      href={href}
      className="underline text-tertiary hover:duration-200 ease-in-out hover:text-secondary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkText}
    </a>
  );
};

export default StyledLink;
