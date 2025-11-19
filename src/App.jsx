import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Journal from "./Pages/Journal/Journal.jsx";

function App() {
  return (
    <BrowserRouter>

        <Navigation />
          <Routes>
            <Route path="/journal" element={<Journal />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
