import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getArticle } from "../../utils/helpers";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import "./Story.css";

function Story(props) {
  const [duration, setDuration] = useState(0);
  const [isListenBlockShowed, setListenBlockShowed] = useState(false);
  const [isSongPlayed, setSongPlayed] = useState(false);
  const [progress, setProgress] = useState(0);
  const song = useMemo(() => {
    const track = new Audio();
    track.src = props.file;
    track.onloadedmetadata = function () {
      setDuration(track.duration);
    };
    return track;
  }, [props.file]);

  function SITime(time) {
    const seconds = Math.round(time);
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;
    return `${mins} минут ${secs} секунд`;
  }

  function play() {
    if (progress >= 60) {
      song.currentTime = 0;
      setProgress(0);
    }
    setSongPlayed(true);
    song.play();
  }

  function showListenBlock() {
    setListenBlockShowed(true);
    play();
  }

  function pause() {
    setSongPlayed(false);
    song.pause();
  }

  useEffect(() => {
    function stop() {
      setSongPlayed(false);
      song.pause();
      song.currentTime = 0;
    }

    if (isSongPlayed) {
      const step = setInterval(() => {
        const currentTime = song.currentTime;
        setProgress(currentTime);
      }, 1000);

      if (progress >= 60) {
        stop();
      }
      return () => clearInterval(step);
    }
  }, [isSongPlayed, progress, song, song.currentTime]);

  function show(e) {
    song.currentTime = e.target.value;
  }

  return (
    <section className="Story">
      <article className="Story__track">
        <div className="Story__track-info">
          <div className="Story__track-article">
            <h3 className="Story__track-article-title">Код товара:</h3>
            <h3 className="Story__track-article-title">
              {getArticle(props.name)}
            </h3>
          </div>
          <div className="Story__track-duration">
            <h3 className="Story__track-duration-title">Продолжительность:</h3>
            <h3>{SITime(duration)}</h3>
          </div>
        </div>
        <div className="Story__track-listenBlock">
          {!isListenBlockShowed ? (
            <button onClick={showListenBlock}>
              Прослушать отрывок (первая минута)
            </button>
          ) : (
            <>
              {isSongPlayed ? (
                <img
                  onClick={pause}
                  className="Story__track-button"
                  src={pauseIcon}
                  alt="Пауза"
                />
              ) : (
                <img
                  onClick={play}
                  className="Story__track-button"
                  src={playIcon}
                  alt="Запустить"
                />
              )}
              <input
                type="range"
                value={progress}
                min="0"
                max="60"
                step="1"
                onInput={show}
                className="Story__track-range"
                style={{
                  background: `linear-gradient(
                to right,
                rgba(113, 7, 7, 1) 0%,
                rgba(113, 7, 7, 1) ${progress}%,
                #fff ${progress}%,
                #fff 100%
              )`,
                }}
              />
            </>
          )}
        </div>
        <Link
          to="/"
          onClick={() => {
            props.setHeaderText("Волшебные сказки");
          }}
          className="Story__back"
          style={{
            backgroundColor: `var(--t-color${Math.ceil(Math.random() * 3)})`,
          }}
        >
          Вернуться на главную
        </Link>
      </article>
      <div className="Story__poster">
        <img
          src={props.image}
          className="Story__poster-image"
          alt={props.name}
        />
      </div>
    </section>
  );
}

export default Story;
