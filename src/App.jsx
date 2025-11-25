import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Home from "./Pages/Home/home.jsx";
import Journal from "./Pages/Journal/Journal.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import Ascension from "./Pages/Ascensions/Ascension.jsx";

function App() {
  const [ascensions, setAscensions] = useState([]);

  const addAscension = (newAscension) => {
      setAscensions([...ascensions, newAscension]);
  };

  const deleteAscension = (indexToDelete) => {
      setAscensions(ascensions.filter((_, index) => index !== indexToDelete));
  };

  return (
    <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home ascensions={ascensions} onDelete={deleteAscension} />} />
            <Route 
              path="/ascensions" 
              element={
                <Ascension 
                  ascensions={ascensions} 
                  onAdd={addAscension} 
                  onDelete={deleteAscension} 
                />
              } 
            />
            <Route path="/journal" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
