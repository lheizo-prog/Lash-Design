import { Routes, Route } from "react-router-dom";
import LashDesignSite from "./pages/PaginaPrincipal.js";
import QuizPage from "./pages/QuizPage.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LashDesignSite />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
}

export default App;
