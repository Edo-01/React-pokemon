import style from "../assets/css/VistaDesk.module.css";
import logo from "../assets/img/logo.svg";
import personaggio from "../assets/img/personaggio-desk.png";
function VistaDesktop() {
  return (
    <div className={style.sfondoFixed}>
      <div className={style.box}>
        <div className={style.rigaUno}>
          <img src={logo} alt="" />
        </div>
        <div className={style.rigaDue}>
          <img src={personaggio} alt="" />
          <h2>Sorry, only available for mobile</h2>
        </div>
      </div>
    </div>
  );
}

export default VistaDesktop;
