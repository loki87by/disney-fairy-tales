import React from "react";
import { Link } from "react-router-dom";
import { STORIES } from "../../utils/consts";
import "./Main.css";

function Main() {
  const alphabetArray = [];
  STORIES.reduce((p, i, index) => {
    let arr = [];

    if (!p[0] || p[0].name[0] === i.name[0]) {
      arr = p;
      arr.push(i);
      return arr;
    } else {
      alphabetArray.push(p);

      if (index === STORIES.length - 1) {
        alphabetArray.push([i]);
      }
      return [i];
    }
  }, []);

  return (
    <section>
      <ul>
        {alphabetArray.map((symbol, index) => (
          <li key={index}>
            <div className="Main__list-item">
              <h3>{symbol[0].name[0]}</h3>
              {symbol.map((story) => (
                <Link
                  to={`/stories:${story.link.toLowerCase()}`}
                  key={story.link}
                  style={{
                    color: `var(--t-color${Math.ceil(Math.random() * 3)})`,
                  }}
                >
                  {story.name}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Main;
