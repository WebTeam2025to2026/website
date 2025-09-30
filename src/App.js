import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";

import Gallery from "./pages/Gallery";

// Import Navbar
import Navbar from "./components/Navbar";
// Import Footer
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
