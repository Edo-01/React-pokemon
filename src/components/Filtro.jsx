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
          <div className={style.rigaCorpo + " " + style.rigaUno}>riga1</div>
          <div className={style.rigaCorpo + " " + style.rigaDue}>riga2</div>
          <div className={style.rigaCorpo + " " + style.rigaTre}>riga3</div>
          <div className={style.rigaCorpo + " " + style.rigaQuattro}>riga4</div>
          <div className={style.rigaCorpo + " " + style.rigaCinque}>riga5</div>
        </div>
      </div>
    </div>
  );
}

export default Filtro;
