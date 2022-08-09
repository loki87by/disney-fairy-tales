// ***импорты
import React from "react";
import { Link } from 'react-router-dom';
import { STORIES } from '../../utils/consts';
import "./Main.css";

// ***функционал
function Main(props) {
  // **стейты

  // **DOM
  return (
    <section>
      <h1>Алфавитный указатель</h1>
      {STORIES.map((story, index) => (
        <Link to={`/stories:${story.link.toLowerCase()}`} key={index}>{story.name}</Link>
      ))}
    </section>
  );
}

// ***экспорт
export default Main;
