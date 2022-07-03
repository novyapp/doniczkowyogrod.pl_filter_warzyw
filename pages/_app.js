import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
