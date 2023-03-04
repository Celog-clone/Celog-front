import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "styles/theme";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StyledEngineProvider injectFirst>
    <GlobalStyle />
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </CookiesProvider>
  </StyledEngineProvider>
);
