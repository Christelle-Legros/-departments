import "../src/styles/styles.css";
import Header from "./components/Header";
import QuizByNumber from "./components/QuizByNumber";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Help from "./components/Help";
import QuizByName from "./components/QuizByName";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/bynumber" element={<QuizByNumber />} />
          <Route path="/byname" element={<QuizByName />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
