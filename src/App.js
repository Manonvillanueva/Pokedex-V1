import "./App";
import { Route, Router, Routes } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import PokeList from "./Pages/PokeList";
import Fav from "./Pages/Fav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Detail from "./Pages/Detail";

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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
