import "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import PokeList from "./Pages/PokeList";
import Fav from "./Pages/Fav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Detail from "./Pages/Detail";
import "./styles/app.css";

function App() {
  return (
    <Router>
      <div className="pokedex-container">
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/list" element={<PokeList />} />
            <Route path="/favorites" element={<Fav />} />
            <Route path="/pokemon/:id" element={<Detail />} />
            <Route path="*" element={<Accueil />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
