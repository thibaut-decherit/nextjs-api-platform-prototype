import PropTypes from "prop-types";
import {ReactNode, useState} from "react";
import {DehydratedState, Hydrate, QueryClient, QueryClientProvider} from "react-query";
import "../src/app/globals.css";

const Layout = (
  {
    children,
    dehydratedState
  }: {
    children: ReactNode;
    dehydratedState: DehydratedState;
  }
) => {
  const [queryClient] = useState(() => new QueryClient());
console.log(dehydratedState)
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        {children}
      </Hydrate>
    </QueryClientProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
