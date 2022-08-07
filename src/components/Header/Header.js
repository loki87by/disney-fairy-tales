// **импорты
import React from "react";
import { TranslationContext } from "../../contexts/translationContext";
import eng from "../../images/UK.png";
import rus from "../../images/RU.png";
import "./Header.css";
import "./styles/__button/Header__button.css";
import "./styles/__button-image/Header__button-image.css";
import "./styles/__score/Header__score.css";
import "./styles/__button/_rules/Header__button_rules.css";

// **функционал
function Header(props) {
  const translation = React.useContext(TranslationContext);

  // *языковой переключатель
  function langChanger() {
    if (props.lang === "ru") {
      props.setLang("en");
    } else {
      props.setLang("ru");
    }
  }

  function openRules(e) {
    if (e.clientX === 0) {
      return;
    }
    props.toggleRules();
  }

  React.useEffect(() => {
    const body = document.querySelector("body");
    const vmin = Math.min(body.clientHeight, body.clientWidth) / 100;

    if (props.isMobile && props.score > 0 && props.score / 100 < 10 * vmin) {
      const headerScore = document.querySelector(".Header__score");
      headerScore.setAttribute(
        "style",
        `margin-top: ${props.score / 100}px; margin-bottom: -${
          props.score / 100
        }px;`
      );
    }
  });

  // *DOM
  return (
    <header className="Header">
      {props.lang === "ru" ? (
        <button className="Header__button" type="button" onClick={langChanger}>
          <img className="Header__button-image" src={eng} alt="флаг СК" />
        </button>
      ) : (
        <button className="Header__button" type="button" onClick={langChanger}>
          <img className="Header__button-image" src={rus} alt="флаг РФ" />
        </button>
      )}
      {props.gameStarted ? (
        <h3 className="Header__score">
          {translation.score}
          {props.score}
        </h3>
      ) : (
        ""
      )}
      <button
        className="Header__button Header__button_rules"
        onClick={openRules}
      >
        {translation.rulesTitle}
      </button>
    </header>
  );
}
// **экспорт
export default Header;
