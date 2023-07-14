import { useState } from "react";
import style from "../assets/css/Vista.module.css";
import Home from "./Home";

function Vista() {
  const [inputSearch, setInputSearch] = useState("");
  const [pokemonRicerca, setPokemonRicerca] = useState(false); // risultato dell API
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState(false);
  const [pokemonPreferiti, setPokemonPreferiti] = useState([]);

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

  return (
    <>
      <div className={style.sfondoFixed}></div>
      <Home
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        cercaDato={cercaDato}
        loading={loading}
        errore={errore}
        pokemonRicerca={pokemonRicerca}
        addPreferiti={addPreferiti}
        pokemonPreferiti={pokemonPreferiti}
      />
    </>
  );
}

export default Vista;
