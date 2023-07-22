import { IoIosArrowBack } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";
import style from "../assets/css/Cronologia.module.css";
import palla from "../assets/img/ico-ball-scheda.png";
import cestino from "../assets/img/ico-cestino.png";
import copia from "../assets/img/ico-copy.svg";

import vedi from "../assets/img/ico-vedi.png";
import { useEffect, useState, useRef } from "react";

function CardHistory({ obj, children }) {
  const [copy, setCopy] = useState(false);

  function handlerCopy(par) {
    navigator.clipboard.writeText(par); //copio il testo
    setCopy(true);
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      setCopy(false);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [copy]);

  return (
    <>
      <div className={style.baseCard}>
        <div className={style.rigaAlta}>
          <h3>{obj.name}</h3>
        </div>
        <div className={style.rigaImg}>
          <img src={obj.sprites.front_default} alt="" />
        </div>
        <div className={style.rigaBassa}>
          <div className={style.boxNum}>
            <img src={palla} alt="" />
            <p>
              N° <span>{obj.order}</span>
            </p>
          </div>
          <div className={style.boxCanc}>
            <img onClick={() => handlerCopy(obj.name)} src={copia} alt="" />
          </div>
        </div>

        {copy ? children : null}
      </div>
    </>
  );
}

function CoperturaCopy() {
  return (
    <>
      <div className={style.baseCopertura}>
        <div className={style.centroCopertura}>
          <BsCheck2Circle className={style.icona} />
          <span>Copied</span>
        </div>
      </div>
    </>
  );
}

function Cronologia({
  cambiaPag,
  pokemonCronologia,
  displayHistory,
  setDisplayHistory,
  cancCrono,
}) {
  const titleCronoRef = useRef(null);
  const h2CronoRef = useRef(null);
  useEffect(() => {
    function segna() {
      if (titleCronoRef.current.offsetTop > 65) {
        titleCronoRef.current.style.backgroundColor = "rgba(132, 111, 204)";
        titleCronoRef.current.style.padding = "12px 20px";
        h2CronoRef.current.style.color = "#F3F3F3";
      } else {
        titleCronoRef.current.removeAttribute("style");
        h2CronoRef.current.removeAttribute("style");
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
          <p>Back</p>
        </div>
      </div>
      <div ref={titleCronoRef} className={style.containerTitle}>
        <h2 ref={h2CronoRef}>Search history</h2>
      </div>
      <div className={style.containerFiltri}>
        <div className={style.filtriCol1}>
          <p>Show</p>
          <select
            onChange={(e) => {
              setDisplayHistory(e.target.value);
            }}
            defaultValue={displayHistory}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
        <div className={style.filtriCol2}>
          <p onClick={cancCrono}>Remove all</p>
        </div>
      </div>
      <div className={style.containerSchede}>
        {pokemonCronologia.map((obj, index) => {
          if (index < displayHistory) {
            return (
              <CardHistory key={index} obj={obj}>
                <CoperturaCopy />
              </CardHistory>
            );
          }
        })}
      </div>
    </>
  );
}

export default Cronologia;
