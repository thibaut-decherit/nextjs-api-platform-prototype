import PropTypes from "prop-types";
import {ReactNode} from "react";
import "../src/app/globals.css";

const Layout = (
  {
    children
  }: {
    children: ReactNode;
  }
) => {

  return (
    <>
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
