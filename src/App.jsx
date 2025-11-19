import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Journal from "./Pages/Journal/Journal.jsx";
import Profile from "./Pages/Profile/Profile.jsx";

function App() {
  return (
    <BrowserRouter>

        <Navigation />
          <Routes>
            <Route path="/journal" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
