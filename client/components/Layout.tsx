import PropTypes from "prop-types";
import {ReactNode} from "react";
import {QueryClient, QueryClientProvider,} from "react-query";
import "../src/app/globals.css";

const queryClient = new QueryClient()

const Layout = (
  {
    children
  }: {
    children: ReactNode;
  }
) => {

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
