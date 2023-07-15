import style from "../assets/css/Scheda.module.css";
import ball from "../assets/img/ico-ball-scheda.png";
import icoRuota from "../assets/img/ico-gira.png";
import { useState } from "react";

let classeDinamica = null;
function scegliClasse(nome) {
  if (nome === "grass") {
    classeDinamica = style.skillGrass;
    return classeDinamica;
  }
  if (nome === "poison") {
    classeDinamica = style.skillPoison;
    return classeDinamica;
  }
  if (nome === "normal") {
    classeDinamica = style.skillNormal;
    return classeDinamica;
  }
  if (nome === "fire") {
    classeDinamica = style.skillFire;
    return classeDinamica;
  }
  if (nome === "water") {
    classeDinamica = style.skillWater;
    return classeDinamica;
  }
  if (nome === "electric") {
    classeDinamica = style.skillElectric;
    return classeDinamica;
  }
  if (nome === "ice") {
    classeDinamica = style.skillIce;
    return classeDinamica;
  }
  if (nome === "fighting") {
    classeDinamica = style.skillFighting;
    return classeDinamica;
  }
  if (nome === "ground") {
    classeDinamica = style.skillGround;
    return classeDinamica;
  }
  if (nome === "flying") {
    classeDinamica = style.skillFlying;
    return classeDinamica;
  }
  if (nome === "psychic") {
    classeDinamica = style.skillPsychic;
    return classeDinamica;
  }
  if (nome === "bug") {
    classeDinamica = style.skillBug;
    return classeDinamica;
  }
  if (nome === "rock") {
    classeDinamica = style.skillRock;
    return classeDinamica;
  }
  if (nome === "ghost") {
    classeDinamica = style.skillGhost;
    return classeDinamica;
  }
  if (nome === "dark") {
    classeDinamica = style.skillDark;
    return classeDinamica;
  }
  if (nome === "dragon") {
    classeDinamica = style.skillDragon;
    return classeDinamica;
  }
  if (nome === "steel") {
    classeDinamica = style.skillSteel;
    return classeDinamica;
  }
  if (nome === "fairy") {
    classeDinamica = style.skillFairy;
    return classeDinamica;
  } else {
    classeDinamica = style.skillDefault;
    return classeDinamica;
  }
}

function formattaMisure(num) {
  let formato = num * 0.1;
  let strCorta = formato.toFixed(1);

  let conVirgola = strCorta.replace(".", ",");
  return conVirgola;
}

function Scheda({ children, pokemonRicerca }) {
  const [imgFront, setImgFront] = useState(true);
  function ruotaImg() {
    setImgFront(!imgFront);
  }
  return (
    <div className={style.baseScheda}>
      <div className={style.rigaUnoScheda}>
        <div className={style.boxNumber}>
          <img src={ball} alt="" />
          <p>
            N° <span>{pokemonRicerca.order}</span>
          </p>
        </div>
        <h3 className={style.nomePokemon}>{pokemonRicerca.name}</h3>
        <div className={style.boxStella}>{children}</div>
      </div>
      <div className={style.centroScheda}>
        <p>{pokemonRicerca.stats[0].base_stat} PV</p>
        {imgFront ? (
          <img src={pokemonRicerca.sprites.front_default} alt="" />
        ) : (
          <img src={pokemonRicerca.sprites.back_default} alt="" />
        )}

        <div onClick={ruotaImg} className={style.tastoRouta}>
          <img src={icoRuota} alt="" />
        </div>
        <div className={style.boxDettagliSkill}>
          {pokemonRicerca.types.map((obj, index) => {
            return (
              <div key={index} className={scegliClasse(obj.type.name)}>
                <span>{obj.type.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.fineScheda}>
        <div className={style.rigaFineScheda}>
          <p>
            Weight: <span>{formattaMisure(pokemonRicerca.weight)} kg</span>
          </p>
          <p>
            Height: <span>{formattaMisure(pokemonRicerca.height)} m</span>
          </p>
        </div>
        <div className={style.rigaFineScheda}>
          <p>Abilities:</p>
          {pokemonRicerca.abilities.map((obj, index) => {
            return <span key={index}>{obj.ability.name}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Scheda;
