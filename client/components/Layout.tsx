import "@/src/app/globals.css";
import PropTypes from "prop-types";
import {ReactNode, useState} from "react";
import {DehydratedState, Hydrate, QueryClient, QueryClientProvider} from "react-query";

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
