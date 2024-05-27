import { css } from "@emotion/react";
import TopBar from "./components/navigation/TopBar";
import TestResultsPageWrap from "./pages/TestResultsPageWrap";

const rootStyle = css`
  font-family: 'Trebuchet MS', sans-serif;

  width: 100vw;
  height: 100vh;
`;
export const App = () => (
  <main css={rootStyle}>
    <TopBar />
    <TestResultsPageWrap />
  </main>
);
export default App;