import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "routes/SignIn";
import SignUp from "routes/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
