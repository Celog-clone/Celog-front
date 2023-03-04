import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "routes/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
