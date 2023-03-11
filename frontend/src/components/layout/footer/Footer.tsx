import React from "react";
import RouterLink from "../../ui/RouterLink";

const Footer = () => {
  return (
    <footer className="text-white bg-secondary justify-between items-center px-4 py-4 rounded-t-lg">
      <div className="top-half flex justify-between items-center">
        <div className="left-half">
          <p className="text-md font-bold">friday</p>
          <p className="text-sm">a better day than monday || we know you're looking forward to it</p>
        </div>
        <div className="right-half flex space-x-4 items-center">
          <RouterLink to="/404Page" routerLinkText="our mission" />
          <RouterLink to="/404Page" routerLinkText="contact us" />
          <RouterLink to="/404Page" routerLinkText="Get Started" />
        </div>
      </div>
      <hr />
      <br />
      <div className="text-sm flex justify-between">
        <p>Copyright© JEKT. All rights reserved.</p>
        <div className="flex space-x-6">
          <p>terms of use</p>
          <p>privacy policy</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
