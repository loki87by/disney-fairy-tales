import React, { useState, createElement } from "react";
import { Link } from "react-router-dom";
import { STORIES, NAVIGATION, PAGES_CONTENT } from "../../utils/consts";
import { getArticle } from "../../utils/helpers";
import "./Main.css";

function Main() {
  const [pageState, setPageState] = useState("storyList");
  const [isMultiSelectMode, setMultiSelectMode] = useState(false);
  const [navigationState, setNavigationState] = useState([0, 1, 2, 3]);
  const [articles, setArticles] = useState([]);
  const [itemsCode, setItemsCode] = useState("");

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

  function toggleMultiSelectMode() {
    const mode = !isMultiSelectMode;
    setMultiSelectMode(mode);
    setArticles([]);
    setItemsCode("");
  }

  function select(e) {
    const value = e.target.value;
    let data;

    if (articles.some((i) => i === value)) {
      const index = articles.findIndex((i) => i === value);
      data = [...articles.slice(0, index), ...articles.slice(index + 1)];
    } else {
      data = articles;
      data.push(value);
    }
    data.sort();
    setArticles(data);

    if (data.length > 0) {
      if (data.length === 1) {
        setItemsCode(`Код выбранного товара: ${data[0]}`);
      } else {
        setItemsCode(`Код выбранных товаров: (${data.join(", ")})`);
      }
    } else {
      setItemsCode("");
    }
  }

  return (
    <section>
      <div className="Main__navigation">
        {NAVIGATION.map((tab, index) => (
          <div className="Main__navigation-container" key={tab.state}>
            <button
              onClick={() => {
                setNavigationState(tab.backgrounds);
                setPageState(tab.state);
                setItemsCode("");
                setArticles([]);
                setMultiSelectMode(false);
              }}
              className={`Main__navigation-button ${
                tab.backgrounds.join("") === navigationState.join("") &&
                "Main__navigation-button_active"
              }`}
              style={{
                backgroundColor: `var(--t-color${navigationState[index]})`,
              }}
            >
              {tab.title}
            </button>
          </div>
        ))}
      </div>
      {pageState === "storyList" ? (
        <>
          <ul>
            {alphabetArray.map((symbol, index) => (
              <li key={index}>
                <div className="Main__list-item">
                  <h3>{symbol[0].name[0]}</h3>
                  {symbol.map((story) =>
                    isMultiSelectMode ? (
                      <div key={story.link} style={{ display: "flex" }}>
                        <input
                          type="checkbox"
                          id={`${story.link}-checkbox`}
                          value={getArticle(story.name)}
                          onChange={select}
                        />
                        <label
                          htmlFor={`${story.link}-checkbox`}
                          style={{
                            color: `var(--t-color${Math.ceil(
                              Math.random() * 3
                            )})`,
                          }}
                        >
                          {story.name}
                        </label>
                      </div>
                    ) : (
                      <Link
                        to={`/stories:${story.link.toLowerCase()}`}
                        key={story.link}
                        style={{
                          color: `var(--t-color${Math.ceil(
                            Math.random() * 3
                          )})`,
                        }}
                      >
                        {story.name}
                      </Link>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
          {isMultiSelectMode ? (
            <h3 style={{ textAlign: "center" }}>{itemsCode}</h3>
          ) : (
            ""
          )}
          <button
            onClick={toggleMultiSelectMode}
            className="Main__switchButton"
            style={{
              backgroundColor: `var(--t-color${Math.ceil(Math.random() * 3)})`,
            }}
          >
            {isMultiSelectMode
              ? "Перейти в режим просмотра"
              : "Перейти в режим выбора файлов"}
          </button>
        </>
      ) : (
        <div className="Main__description">
          {PAGES_CONTENT[pageState].map((page, index) => (
            <div key={index}>
              {createElement(page.component, page.props, page.children)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Main;
