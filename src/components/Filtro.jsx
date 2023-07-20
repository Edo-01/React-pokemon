import { useState, useRef, useEffect } from "react";
import style from "../assets/css/Filtro.module.css";
import icoApri from "../assets/img/ico-apri.png";
import icoTendina from "../assets/img/ico-tendina.png";

function Filtro({
  setInputSelect,
  setOrdineFiltro,
  ordineFiltro,
  impostaFiltro,
  aperto,
  setAperto,
  rimuoviFiltri,
  inputSelect,
}) {
  // const [aperto, setAperto] = useState(false);

  const divTendaRef = useRef(null);
  const contenutoTendaRef = useRef(null);

  // const [inputSelect, setInputSelect] = useState("normal");
  // const [ordineFiltro, setOrdineFiltro] = useState("pvasc"); // pvasc-pvdes-numasc-numdes
  // const [filtro, setFiltro] = useState({
  //   pokemonType: inputSelect,
  //   order: ordineFiltro,
  // });
  // function impostaFiltro() {
  //   setFiltro({
  //     pokemonType: inputSelect,
  //     order: ordineFiltro,
  //   });
  // }

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
            <select
              onChange={(e) => {
                setInputSelect(e.target.value);
              }}
              name="pokemonType"
              id=""
              value={inputSelect}
            >
              <option value="normal">Normal</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="grass">Grass</option>
              <option value="electric">Electric</option>
              <option value="ice">Ice</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dark">Dark</option>
              <option value="dragon">Dragon</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaDue}>
            <p className={style.filtroOrder}>Order by</p>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaTre}>
            <div className={style.colRiga3A}>
              <p>PV</p>
              <button
                onClick={() => {
                  setOrdineFiltro("pvasc");
                }}
                className={
                  ordineFiltro === "pvasc"
                    ? style.colRiga3BottUno + " " + style.attivo
                    : style.colRiga3BottUno
                }
              >
                Asc
              </button>
              <button
                onClick={() => {
                  setOrdineFiltro("pvdes");
                }}
                className={ordineFiltro === "pvdes" ? style.attivo : null}
              >
                Des
              </button>
            </div>
            <div className={style.colRiga3B}>
              <p>Number</p>
              <button
                onClick={() => {
                  setOrdineFiltro("numasc");
                }}
                className={
                  ordineFiltro === "numasc"
                    ? style.colRiga3BottUno + " " + style.attivo
                    : style.colRiga3BottUno
                }
              >
                Asc
              </button>
              <button
                onClick={() => {
                  setOrdineFiltro("numdes");
                }}
                className={ordineFiltro === "numdes" ? style.attivo : null}
              >
                Des
              </button>
            </div>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaQuattro}>
            <p>
              <span onClick={rimuoviFiltri}>Remove filter</span>
            </p>
          </div>
          <div className={style.rigaCorpo + " " + style.rigaCinque}>
            <button onClick={impostaFiltro} className={style.apply}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtro;
