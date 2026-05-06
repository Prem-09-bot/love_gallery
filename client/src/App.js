import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Gallery from "./Gallery";

function App() {
  return (
    <BrowserRouter>
      {/* 🎵 Background Music */}
      <audio autoPlay loop>
        <source src="/love.mp3" type="audio/mpeg" />
      </audio>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;