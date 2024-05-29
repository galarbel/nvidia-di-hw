import { css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import TopBar from "./components/navigation/TopBar";
import TestResultsPageWrap from "./pages/TestResultsPageWrap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const rootStyle = css`
  width: 100vw;
  height: 100vh;
`;
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <main css={rootStyle}>
      <TopBar />
      <TestResultsPageWrap />
    </main>
  </QueryClientProvider>
);
export default App;
