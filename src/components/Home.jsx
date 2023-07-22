import style from "../assets/css/Home.module.css";
import logo from "../assets/img/logo.svg";
import personaggio from "../assets/img/personaggio-input.png";
import icoCerca from "../assets/img/ico-cerca.svg";
import ballTasto from "../assets/img/ball-tasto.png";
import Scheda from "./SchedaPokemon";
import stella from "../assets/img/ico-star.png";
import stellaPiena from "../assets/img/ico-star-piena.png";
import pokemonError from "../assets/img/pokemon-errore.png";
import gruppoPalle from "../assets/img/gruppo-stelle.png";

import { AiOutlineSearch } from "react-icons/ai";
import { Fragment, useEffect, useRef, useState } from "react";

function BallPreferiti({ pokemonPreferiti, cambiaPag }) {
  return (
    <div onClick={cambiaPag("preferiti")} className={style.containerBall}>
      {pokemonPreferiti.length === 0 ? null : (
        <div className={style.contatoreBall}>
          <span>{pokemonPreferiti.length}</span>
        </div>
      )}

      <img src={ballTasto} alt="" />
      <p>Prefers</p>
    </div>
  );
}

function Home({
  inputSearch,
  setInputSearch,
  cercaDato,
  errore,
  loading,
  pokemonRicerca,
  addPreferiti,
  pokemonPreferiti,
  cambiaPag,
  pokemonCronologia,
  hendlerChange,
  lisatCorrispondenza,
  sceltaLista,
  listaOpen,
}) {
  let inputRef = useRef(null);
  // const [lista, setLista] = useState([]);
  // const [lisatCorrispondenza, setListaCorrispondenza] = useState([]);

  // function hendlerChange(e) {
  //   let testo = e.target.value;
  //   setInputSearch(testo.toLowerCase().trim());
  //   console.log(testo);
  //   autocomplete(testo);
  // }
  //autocomplete----------------------------------------------------------

  // useEffect(() => {
  //   async function richiedi() {
  //     let risp = await fetch(
  //       "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  //     );
  //     let obj = await risp.json();

  //     setLista(obj.results); //arry di obj
  //   }
  //   richiedi();
  // }, []);

  // function autocomplete(testo) {
  //   let corrispondenza = lista.filter((obj) => {
  //     if (testo.length === 1) {
  //       return obj.name[0].includes(testo[0]);
  //     }
  //     if (testo.length === 2) {
  //       return obj.name[0].includes(testo[0]) && obj.name[1].includes(testo[1]);
  //     }
  //     if (testo.length === 3) {
  //       return (
  //         obj.name[0].includes(testo[0]) &&
  //         obj.name[1].includes(testo[1]) &&
  //         obj.name[2].includes(testo[2])
  //       );
  //     }
  //     if (testo.length === 4) {
  //       return (
  //         obj.name[0].includes(testo[0]) &&
  //         obj.name[1].includes(testo[1]) &&
  //         obj.name[2].includes(testo[2]) &&
  //         obj.name[3].includes(testo[3])
  //       );
  //     }
  //   });
  //   let corrispondenzaNomi = corrispondenza.map((obj) => {
  //     return obj.name;
  //   });
  //   let primiNomi = corrispondenzaNomi.slice(0, 10);

  //   setListaCorrispondenza(primiNomi); // array di nomi corrispondenti
  // }

  // console.log(lisatCorrispondenza);

  // function sceltaLista(param) {
  //   console.log(param);
  // }

  //autocomplete----------------------------------------------------------

  function controllaPresenza(parId) {
    let elemTrovato = pokemonPreferiti.find((obj) => {
      return obj.id === parId;
    });
    return elemTrovato; // se è vero ha trovato, se no torna undefined
  }

  return (
    <>
      <div className={style.conatinerUno}>
        <img src={logo} alt="" />
      </div>
      <div className={style.containerSearch}>
        <div className={style.contenitoreInput}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              ref={inputRef}
              onChange={hendlerChange}
              value={inputSearch}
              type="text"
              placeholder="Search your Pokèmon"
              maxLength={20}
            />
            <img
              className={style.imgPersonaggioInput}
              src={personaggio}
              alt=""
            />
            <button
              onClick={() => cercaDato(inputRef)}
              className={style.tastoCerca}
            >
              <img src={icoCerca} alt="" />
            </button>
          </form>

          {lisatCorrispondenza.length > 0 && listaOpen ? (
            <div className={style.containerConsigliati}>
              {lisatCorrispondenza.map((nome, index) => {
                return (
                  <div key={index}>
                    <AiOutlineSearch className={style.consigliatiIco} />
                    <p
                      onClick={() => {
                        sceltaLista(nome, inputRef);
                      }}
                    >
                      {nome}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className={style.contenitoreTesto}>
          {pokemonCronologia.length > 0 ? (
            <p onClick={cambiaPag("cronologia")}>Search history</p>
          ) : null}
        </div>
      </div>

      <div className={style.containerScheda}>
        {loading ? (
          <div className={style.containerLoading}>
            <img src={gruppoPalle} alt="" />
            <h2>Loading...</h2>
          </div>
        ) : null}
        {errore ? (
          <div className={style.containerError}>
            <img src={pokemonError} alt="" />
            <h2>
              Ops! Something went wrong. <br /> Try again
            </h2>
          </div>
        ) : null}
        {pokemonRicerca ? (
          <Scheda pokemonRicerca={pokemonRicerca}>
            <div onClick={addPreferiti} className={style.tastoStella}>
              {controllaPresenza(pokemonRicerca.id) ? (
                <img src={stellaPiena} alt="" />
              ) : (
                <img src={stella} alt="" />
              )}
            </div>
          </Scheda>
        ) : null}
      </div>
      <BallPreferiti
        pokemonPreferiti={pokemonPreferiti}
        cambiaPag={cambiaPag}
      />
    </>
  );
}

export default Home;
