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
import { useRef } from "react";

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
}) {
  let inputRef = useRef(null);

  function hendlerChange(e) {
    let testo = e.target.value;
    setInputSearch(testo.toLowerCase().trim());
  }

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
