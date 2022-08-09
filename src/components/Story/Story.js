// ***импорты
import React from "react";
import "./Story.css";

// ***функционал
function Story(props) {
  // **DOM
  return (
    <section>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} />
    </section>
  );
}

// ***экспорт
export default Story;
