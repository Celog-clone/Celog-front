import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { isLightState } from "store/atoms";
import { GlobalStyle, defaultTheme, darkTheme } from "styles/theme";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import MyPage from "routes/MyPage";
import Main from "routes/Main";
import Post from "routes/Post";
import Detail from "routes/Detail";

const App = () => {
  const isLight = useRecoilValue(isLightState);
  return (
    <>
      <ThemeProvider theme={isLight ? defaultTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:id" element={<Detail />} />
            <Route path="/post" element={<Post />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage/:username" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
