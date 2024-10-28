import "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accueil from "./Pages/Accueil";
import PokeList from "./Pages/PokeList";
import Fav from "./Pages/Fav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Detail from "./Pages/Detail";
import "./styles/app.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dataPoke, setDataPoke] = useState([]);
  useEffect(() => {
    axios
      .get("https://pokebuildapi.fr/api/v1/pokemon/generation/1")
      .then((data) => setDataPoke(data.data));
  }, []);

  return (
    <Router>
      <div className="pokedex-container">
        <Header />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Accueil dataPoke={dataPoke} />} />
            <Route path="/list" element={<PokeList dataPoke={dataPoke} />} />
            <Route path="/favorites" element={<Fav />} />
            <Route
              path="/pokemon/:id"
              element={<Detail />}
              dataPoke={dataPoke}
            />
            <Route path="*" element={<Accueil />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
