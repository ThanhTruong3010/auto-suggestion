import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Setting from "./pages/Setting";

export const settingsDefault = [
  {
    title: "Suggestion",
    name: "suggestions",
    checked: true,
  },
  {
    title: "Collection",
    name: "collections",
    checked: true,
  },
  {
    title: "Product",
    name: "products",
    checked: true,
  },
];

export const characterDisplayDefault = 1;

function App() {
  useEffect(() => {
    const settingFromLocalStorage = JSON.parse(
      localStorage.getItem("setting") || "[]"
    );
    if (!settingFromLocalStorage.length) {
      localStorage.setItem("setting", JSON.stringify(settingsDefault));
    }
    const ch = JSON.parse(
      localStorage.getItem("characterDisplayDefault") || "1"
    );
    if (ch === 1) {
      localStorage.setItem(
        "characterDisplayDefault",
        JSON.stringify(characterDisplayDefault)
      );
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
