import { useEffect, useState } from "react";
import style from "../assets/css/Vista.module.css";
import Home from "./Home";
import Preferiti from "./Preferiti";
import Preferto from "./Preferto";
import Cronologia from "./Cronologia";

function Vista() {
  const [paginaAttiva, setPaginaAttiva] = useState("home");
  const [inputSearch, setInputSearch] = useState("");
  const [pokemonRicerca, setPokemonRicerca] = useState(false); // risultato dell API
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState(false);
  const [pokemonPreferiti, setPokemonPreferiti] = useState([]);
  const [mostraPref, setMostraPref] = useState([]);
  const [filtroAttivo, setFiltroAttivo] = useState(false);

  const [inputSelect, setInputSelect] = useState("normal");
  const [ordineFiltro, setOrdineFiltro] = useState("pvasc"); // pvasc-pvdes-numasc-numdes
  const [filtro, setFiltro] = useState({
    pokemonType: inputSelect,
    order: ordineFiltro,
  });
  const [pokemonCronologia, setPokemonCronologia] = useState([]);

  function mostraSingolo(pagina, obj) {
    return function (e) {
      e.stopPropagation();
      setPaginaAttiva(pagina);
      setMostraPref([obj]);
    };
  }

  function cambiaPag(pagina) {
    return function (e) {
      e.stopPropagation();
      setPaginaAttiva(pagina);
    };
  }
  function cercaDato(parRefInput) {
    let baseIndirizzo = "https://pokeapi.co/api/v2/pokemon/";

    async function richiesta() {
      setPokemonRicerca(false);
      setLoading(true);
      setErrore(false);
      try {
        let risp = await fetch(baseIndirizzo + inputSearch);
        let obj = await risp.json();
        setPokemonRicerca(obj);
        setLoading(false);
        setInputSearch("");
        setPokemonCronologia([...pokemonCronologia, obj]);
      } catch (error) {
        console.log("Ops! C'è stato un errore");
        setErrore(true);
        setLoading(false);
      }
    }
    if (inputSearch === "") {
      parRefInput.current.focus();
      console.log("Non hai scritto nulla!");
    } else {
      richiesta();
    }
  }

  function addPreferiti() {
    let test = controllaPresenza(pokemonRicerca.id);
    if (test === undefined) {
      setPokemonPreferiti([...pokemonPreferiti, pokemonRicerca]);
    } else {
      setPokemonPreferiti(
        pokemonPreferiti.filter((obj) => {
          return obj.id !== pokemonRicerca.id;
        })
      );
    }
  }

  function controllaPresenza(parId) {
    let elemTrovato = pokemonPreferiti.find((obj) => {
      return obj.id === parId;
    });
    return elemTrovato; // se è vero ha trovato, se no torna undefined
  }

  function cancellaPref(elId) {
    return function (e) {
      e.stopPropagation();
      console.log("cancella");
      setPokemonPreferiti(
        pokemonPreferiti.filter((obj) => {
          return obj.id !== elId;
        })
      );
    };
  }
  console.log(pokemonCronologia);
  return (
    <>
      <div className={style.sfondoFixed}></div>
      {paginaAttiva === "home" ? (
        <Home
          inputSearch={inputSearch}
          setInputSearch={setInputSearch}
          cercaDato={cercaDato}
          loading={loading}
          errore={errore}
          pokemonRicerca={pokemonRicerca}
          addPreferiti={addPreferiti}
          pokemonPreferiti={pokemonPreferiti}
          cambiaPag={cambiaPag}
          pokemonCronologia={pokemonCronologia}
        />
      ) : null}
      {paginaAttiva === "preferiti" ? (
        <Preferiti
          cambiaPag={cambiaPag}
          pokemonPreferiti={pokemonPreferiti}
          cancellaPref={cancellaPref}
          mostraSingolo={mostraSingolo}
          filtroAttivo={filtroAttivo}
          setFiltroAttivo={setFiltroAttivo}
          inputSelect={inputSelect}
          setInputSelect={setInputSelect}
          ordineFiltro={ordineFiltro}
          setOrdineFiltro={setOrdineFiltro}
          filtro={filtro}
          setFiltro={setFiltro}
        />
      ) : null}
      {paginaAttiva === "preferito" ? (
        <Preferto cambiaPag={cambiaPag} mostraPref={mostraPref} />
      ) : null}
      {paginaAttiva === "cronologia" ? (
        <Cronologia
          cambiaPag={cambiaPag}
          pokemonCronologia={pokemonCronologia}
        />
      ) : null}
    </>
  );
}

export default Vista;
