import { IoIosArrowBack } from "react-icons/io";
import style from "../assets/css/Cronologia.module.css";
import palla from "../assets/img/ico-ball-scheda.png";
import cestino from "../assets/img/ico-cestino.png";
import copia from "../assets/img/ico-copy.svg";

import vedi from "../assets/img/ico-vedi.png";

function CardHistory({ obj }) {
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
            <img src={copia} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

function Cronologia({ cambiaPag, pokemonCronologia }) {
  return (
    <>
      <div className={style.containerNav}>
        <div onClick={cambiaPag("home")} className={style.bloccoBack}>
          <IoIosArrowBack />
          <p>Back</p>
        </div>
      </div>
      <div className={style.containerTitle}>
        <h2>Search history</h2>
      </div>
      <div className={style.containerFiltri}>
        <div className={style.filtriCol1}>
          <p>Show</p>
          <select>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className={style.filtriCol2}>
          <p>Remove all</p>
        </div>
      </div>
      <div className={style.containerSchede}>
        {pokemonCronologia.map((obj) => {
          return <CardHistory key={obj.id} obj={obj} />;
        })}
      </div>
    </>
  );
}

export default Cronologia;
