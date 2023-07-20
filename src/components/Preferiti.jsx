import style from "../assets/css/Preferiti.module.css";
import { IoIosArrowBack } from "react-icons/io";
import palla from "../assets/img/ico-ball-scheda.png";
import cestino from "../assets/img/ico-cestino.png";
import dorme from "../assets/img/pokemon-dorme.png";
import vedi from "../assets/img/ico-vedi.png";
import pokem from "../assets/img/pokemon-filtro.png";
import { useEffect, useRef, useState } from "react";

import Filtro from "./Filtro";

function NessunPref() {
  return (
    <div className={style.containerNoPref}>
      <img src={dorme} alt="" />
      <h3>You don't have any favourites</h3>
    </div>
  );
}

function FiltroVuoto() {
  return (
    <div className={style.containerNoPref}>
      <img src={pokem} alt="" />
      <h3>Opss...no match!</h3>
    </div>
  );
}

function CardPreferiti({ obj, cancellaPref, cambiaPag, mostraSingolo }) {
  return (
    <div onClick={mostraSingolo("preferito", obj)} className={style.baseCard}>
      <div className={style.rigaAlta}>
        <h3>{obj.name}</h3>
      </div>
      <div className={style.rigaImg}>
        <img src={obj.sprites.front_default} alt="" />
        <div className={style.boxView}>
          <img src={vedi} alt="" />
        </div>
      </div>
      <div className={style.rigaBassa}>
        <div className={style.boxNum}>
          <img src={palla} alt="" />
          <p>
            N° <span>{obj.order}</span>
          </p>
        </div>
        <div onClick={cancellaPref(obj.id)} className={style.boxCanc}>
          <img src={cestino} alt="" />
        </div>
      </div>
    </div>
  );
}

function Preferiti({
  cambiaPag,
  pokemonPreferiti,
  cancellaPref,
  mostraSingolo,
}) {
  const [filtroAttivo, setFiltroAttivo] = useState(false); //stato che controllerà la visualizzazione di tutti i preferiti (dato originale) oppure i filtri(copia del originale)
  const [aperto, setAperto] = useState(false);
  const [inputSelect, setInputSelect] = useState("normal");
  const [ordineFiltro, setOrdineFiltro] = useState("pvasc"); // pvasc-pvdes-numasc-numdes
  const [filtro, setFiltro] = useState({
    pokemonType: inputSelect,
    order: ordineFiltro,
  });
  function impostaFiltro() {
    setFiltro({
      pokemonType: inputSelect,
      order: ordineFiltro,
    });
    setAperto(false);
    setFiltroAttivo(true);
  }

  function rimuoviFiltri() {
    setFiltroAttivo(false);
    setAperto(false);
    setInputSelect("normal");
    setOrdineFiltro("pvasc");
    setFiltro({ pokemonType: "normal", order: "pvasc" });
  }

  const titleRef = useRef(null);
  useEffect(() => {
    function segna() {
      if (titleRef.current.offsetTop > 65) {
        titleRef.current.style.backgroundColor = "rgba(132, 111, 204, 0.65)";
      } else {
        titleRef.current.removeAttribute("style");
      }
    }
    window.addEventListener("scroll", segna);
    return () => {
      window.removeEventListener("scroll", segna);
    };
  }, []);

  function ordina(pokemonType, order) {
    let pokemonFiltartiGlobal = null;
    if (pokemonType === "all") {
      pokemonFiltartiGlobal = pokemonPreferiti;
    } else {
      const pokemonFiltarti = pokemonPreferiti.filter((obj) => {
        return obj.types[0].type.name === pokemonType;
      });
      const pokemonFiltarti2 = pokemonPreferiti.filter((obj) => {
        if (obj.types.length === 2) {
          return obj.types[1].type.name === pokemonType;
        }
      });
      pokemonFiltartiGlobal = pokemonFiltarti.concat(pokemonFiltarti2);
    }

    console.log(pokemonPreferiti);
    console.log(pokemonFiltartiGlobal);
    if (order === "pvasc") {
      pokemonFiltartiGlobal.sort(function (a, b) {
        return a.stats[0].base_stat - b.stats[0].base_stat;
      });
    } else if (order === "pvdes") {
      pokemonFiltartiGlobal.sort(function (a, b) {
        return b.stats[0].base_stat - a.stats[0].base_stat;
      });
    } else if (order === "numasc") {
      pokemonFiltartiGlobal.sort(function (a, b) {
        return a.order - b.order;
      });
    } else if (order === "numdes") {
      pokemonFiltartiGlobal.sort(function (a, b) {
        return b.order - a.order;
      });
    }
    return pokemonFiltartiGlobal;
  }

  const prefertiDatiFiltro = ordina(filtro.pokemonType, filtro.order); // qui ho un array di dati filtrati in base ai parametri

  console.log(prefertiDatiFiltro);

  const soloPreferitiFiltrati = prefertiDatiFiltro.map((obj) => {
    return (
      <CardPreferiti
        key={obj.id}
        obj={obj}
        cancellaPref={cancellaPref}
        cambiaPag={cambiaPag}
        mostraSingolo={mostraSingolo}
      />
    );
  });

  const tuttiPrefriti = pokemonPreferiti.map((obj) => {
    return (
      <CardPreferiti
        key={obj.id}
        obj={obj}
        cancellaPref={cancellaPref}
        cambiaPag={cambiaPag}
        mostraSingolo={mostraSingolo}
      />
    );
  });

  ordina(filtro.pokemonType, filtro.order);

  return (
    <>
      <div className={style.containerNav}>
        <div onClick={cambiaPag("home")} className={style.bloccoBack}>
          <IoIosArrowBack />
          <p>Home</p>
        </div>
      </div>
      <div ref={titleRef} className={style.containerTitle}>
        <h2>My favorites</h2>
      </div>
      {pokemonPreferiti.length === 0 ? null : (
        <div className={style.containerFiltri}>
          <Filtro
            setInputSelect={setInputSelect}
            setOrdineFiltro={setOrdineFiltro}
            ordineFiltro={ordineFiltro}
            impostaFiltro={impostaFiltro}
            aperto={aperto}
            setAperto={setAperto}
            rimuoviFiltri={rimuoviFiltri}
            inputSelect={inputSelect}
          />
        </div>
      )}
      {pokemonPreferiti.length === 0 ? (
        <NessunPref />
      ) : (
        <div className={style.containerSchede}>
          {filtroAttivo ? (
            prefertiDatiFiltro.length === 0 ? (
              <div className={style.containerAvvisoFiltro}>
                <FiltroVuoto />
              </div>
            ) : (
              soloPreferitiFiltrati
            )
          ) : (
            tuttiPrefriti
          )}
        </div>
      )}
    </>
  );
}
// containerAvvisoFiltro
export default Preferiti;
