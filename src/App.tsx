import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import MyPage from "routes/MyPage";
import Main from "routes/Main";
import Post from "routes/Post";
import Detail from "routes/Detail";

const App = () => {
  return (
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
  );
};

export default App;
