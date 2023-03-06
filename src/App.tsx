import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";
import MyPage from "routes/MyPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage/:username" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
