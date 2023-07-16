import style from "../assets/css/Preferiti.module.css";
import { IoIosArrowBack } from "react-icons/io";
import palla from "../assets/img/ico-ball-scheda.png";
import cestino from "../assets/img/ico-cestino.png";
import dorme from "../assets/img/pokemon-dorme.png";
import vedi from "../assets/img/ico-vedi.png";
import { useEffect, useRef } from "react";

import Filtro from "./Filtro";

function NessunPref() {
  return (
    <div className={style.containerNoPref}>
      <img src={dorme} alt="" />
      <h3>You don't have any favourites</h3>
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
          <Filtro />
        </div>
      )}
      {pokemonPreferiti.length === 0 ? (
        <NessunPref />
      ) : (
        <div className={style.containerSchede}>
          {pokemonPreferiti.map((obj) => {
            return (
              <CardPreferiti
                key={obj.id}
                obj={obj}
                cancellaPref={cancellaPref}
                cambiaPag={cambiaPag}
                mostraSingolo={mostraSingolo}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Preferiti;
