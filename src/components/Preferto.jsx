import style from "../assets/css/Preferiti.module.css";
import { IoIosArrowBack } from "react-icons/io";
import Scheda from "./SchedaPokemon";

function Preferito({ cambiaPag, mostraPref }) {
  return (
    <>
      <div className={style.containerNav}>
        <div onClick={cambiaPag("preferiti")} className={style.bloccoBack}>
          <IoIosArrowBack />
          <p>Prefers</p>
        </div>
      </div>
      <div className={style.containerTitle}>
        <h2>{mostraPref[0].name}</h2>
      </div>
      <div className={style.containerScheda}>
        <Scheda pokemonRicerca={mostraPref[0]} />
      </div>
    </>
  );
}

export default Preferito;
