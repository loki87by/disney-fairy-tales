// ***импорты
import React from "react";
import { GAME } from "../../utils/consts";
import { TranslationContext } from "../../contexts/translationContext";
import GameField from "../GameField/GameField";
import "./Main.css";

// ***функционал
function Main(props) {
  // **стейты
  const [numbers, setNumbers] = React.useState(GAME);
  const translation = React.useContext(TranslationContext);

  // **анимация кнопки рестарта геймплея
  React.useEffect(() => {
    const button = document.querySelector(".App__restart-button");

    if (button) {
      function startAnimation() {
        let arr = translation.restart.split("");
        let newArr = arr.map((i, n) => {

          if (i === " ") {
            return `<p class="App__restart-button_symbol" style="animation: none">&nbsp</p>`;
          } else {
            return `<p class="App__restart-button_symbol" style="animation-delay: ${
              n / 2
            }s">${i}</p>`;
          }
        });
        button.innerHTML = newArr.join("");
      }
      startAnimation();
      function overAnimation() {
        button.innerHTML = translation.restart;
      }
      button.addEventListener("mouseover", overAnimation);
      button.addEventListener("mouseout", startAnimation);
      button.addEventListener("onclick", props.restarter);
      return () => {
        button.removeEventListener("mouseover", overAnimation);
        button.removeEventListener("onclick", props.restarter);
      };
    }
  });

  // **DOM
  return (
    <section className="Main">
      <GameField
        numbers={numbers}
        isMobile={props.isMobile}
        gameStarted={props.gameStarted}
        setGameStarted={props.setGameStarted}
        setEndGame={props.setEndGame}
        score={props.score}
        setScore={props.setScore}
        setPopupOpened={props.setPopupOpened}
        setPopupType={props.setPopupType}
        setRulesOpen={props.setRulesOpen}
        setNumbers={setNumbers}
      />
    </section>
  );
}

// ***экспорт
export default Main;
