import { useState, useRef, useEffect } from "react";
import style from "../assets/css/Filtro.module.css";
import icoApri from "../assets/img/ico-apri.png";
import icoTendina from "../assets/img/ico-tendina.png";

function Filtro() {
  const [aperto, setAperto] = useState(false);

  const divTendaRef = useRef(null);
  const contenutoTendaRef = useRef(null);

  useEffect(() => {
    let misuraEl = contenutoTendaRef.current.getBoundingClientRect().height;
    if (aperto) {
      divTendaRef.current.style.height = misuraEl + "px";
    } else {
      divTendaRef.current.style.height = "0px";
    }
  }, [aperto]);

  return (
    <div className={style.boxFiltro}>
      <div
        onClick={() => {
          setAperto(!aperto);
        }}
        className={style.rigaVisibile}
      >
        <div className={style.colImg}></div>
        <div>
          <p className={style.filtroTitolo}>Filter</p>
        </div>
        <div
          className={
            !aperto ? style.colImg : style.colImg + " " + style.colImgOpen
          }
        >
          <img src={icoApri} alt="" />
        </div>
      </div>
      <div
        ref={divTendaRef}
        className={`${aperto ? style.corpoEstesoAperto : style.corpoEsteso}`}
      >
        <div ref={contenutoTendaRef} className={style.gruppoRighe}>
          <div className={style.rigaCorpo + " " + style.rigaUno}>
            <p>Pokèmon type</p>
            <select name="" id="">
              <option value="">Normal</option>
              <option value="">Fire</option>
              <option value="">Water</option>
              <option value="">Grass</option>
              <option value="">Electric</option>
              <option value="">Ice</option>
              <option value="">Fighting</option>
              <option value="">Poison</option>
              <option value="">Ground</option>
              <option value="">Flying</option>
              <option value="">Psychic</option>
              <option value="">Bug</option>
              <option value="">Rock</option>
              <option value="">Ghost</option>
              <option value="">Dark</option>
              <option value="">Dragon</option>
              <option value="">Steel</option>
              <option value="">Fairy</option>
            </select>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaDue}>
            <p className={style.filtroOrder}>Order by</p>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaTre}>
            <div className={style.colRiga3A}>
              <p>PV</p>
              <button className={style.colRiga3BottUno}>Asc</button>
              <button>Des</button>
            </div>
            <div className={style.colRiga3B}>
              <p>Number</p>
              <button className={style.colRiga3BottUno}>Asc</button>
              <button>Des</button>
            </div>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaQuattro}>
            <p>Remove filter</p>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaCinque}>
            <button className={style.apply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtro;
