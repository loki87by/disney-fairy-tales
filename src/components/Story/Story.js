import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import playIcon from "../../assets/icons/play.svg";
import pauseIcon from "../../assets/icons/pause.svg";
import stopIcon from "../../assets/icons/stop.svg";
import backwardIcon from "../../assets/icons/backward.svg";
import forwardIcon from "../../assets/icons/forward.svg";
import downloadIcon from "../../assets/icons/download.svg";
import "./Story.css";

function Story(props) {
  const [isImageLoad, setImageLoad] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isSongPlayed, setSongPlayed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInputHover, setInputHover] = useState(false);
  const [outputProgress, setOutputProgress] = useState(0);
  const [outputPosition, setOutputPosition] = useState(0);
  const song = useMemo(() => {
    const track = new Audio();
    track.src = props.file;
    track.onloadedmetadata = function () {
      setDuration(Math.floor(track.duration));
    };
    return track;
  }, [props.file]);

  const image = useMemo(() => {
    const pic = new Image();
    pic.src = props.image;
    pic.onload = function () {
      setImageLoad(true);
    };
    return pic;
  }, [props.image]);

  function SITime(time, arg) {
    const seconds = Math.round(time);
    const mins = Math.floor(seconds / 60);
    const secs = seconds - mins * 60;

    if (!arg) {
      return `${mins} минут ${secs} секунд`;
    } else {
      if (secs < 10) {
        return `${mins}:0${secs}`;
      } else {
        return `${mins}:${secs}`;
      }
    }
  }

  function play() {
    if (progress >= duration) {
      song.currentTime = 0;
      setProgress(0);
    }
    setSongPlayed(true);
    song.play();
  }

  function pause() {
    setSongPlayed(false);
    song.pause();
  }

  const stop = useCallback(() => {
    setSongPlayed(false);
    song.pause();
    song.currentTime = 0;
    setProgress(0);
  }, [song]);

  useEffect(() => {
    if (isSongPlayed) {
      const step = setInterval(() => {
        const currentTime = song.currentTime;
        setProgress(currentTime);
      }, 1000);

      if (progress >= duration) {
        stop();
      }
      return () => clearInterval(step);
    }
  }, [duration, isSongPlayed, progress, song, song.currentTime, stop]);

  function goToTime(e) {
    song.currentTime = e.target.value;
    setProgress(e.target.value)
  }

  function move(e) {
    const leftStart = e.target.offsetLeft;
    const width = e.target.clientWidth;
    const step = Math.floor(duration) / width;
    const startCountdown = e.clientX - leftStart;
    const time = Math.floor(startCountdown * step);
    const numbersTime = SITime(time, true);
    setOutputProgress(numbersTime);
    setOutputPosition(e.clientX);
  }

  function rewind(arg) {
    const newTime = song.currentTime + arg;
    song.currentTime = newTime;
    setProgress(newTime);
  }

  function backward() {
    rewind(-15);
  }

  function forward() {
    rewind(15);
  }

  function download() {
    const link = document.createElement("a");
    link.download = `${props.name}.mp3`;
    link.href = props.file;
    link.click();
    // eslint-disable-next-line no-unused-expressions
    link.delete;
  }

  return isImageLoad ? (
    <section className="Story">
      <article className="Story__track">
        <div className="Story__track-info">
          <div className="Story__track-duration">
            <h3 className="Story__track-duration-title">Продолжительность:</h3>
            <h3>{SITime(duration)}</h3>
          </div>
        </div>
        <div className="Story__track-listenBlock">
          <div className="Story__track-section">
            <h3 className="Story__track-text">{SITime(progress, true)}</h3>
            <input
              type="range"
              value={progress}
              min="0"
              max={Math.floor(duration)}
              step="1"
              onInput={goToTime}
              onMouseOver={() => {
                setInputHover(true);
              }}
              onMouseOut={() => {
                setInputHover(false);
              }}
              onMouseMove={move}
              className="Story__track-range"
              style={{
                background: `linear-gradient(
                to right,
                rgba(113, 7, 7, 1) 0%,
                rgba(113, 7, 7, 1) ${(100 / Math.floor(duration)) * progress}%,
                #fff ${(100 / Math.floor(duration)) * progress}%,
                #fff 100%
              )`,
              }}
            />
            <h3 className="Story__track-text">
              {SITime(duration - progress, true)}
            </h3>
            {isInputHover ? (
              <output
                className="Story__track-output"
                style={{ left: `${outputPosition - 10}px` }}
              >
                {outputProgress}
              </output>
            ) : (
              ""
            )}
          </div>
          <div className="Story__track-section">
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
            <img
              onClick={backward}
              className="Story__track-button"
              src={backwardIcon}
              alt="Назад на 15 секунд"
            />
            <img
              onClick={stop}
              className="Story__track-button"
              src={stopIcon}
              alt="Стоп"
            />
            <img
              onClick={forward}
              className="Story__track-button"
              src={forwardIcon}
              alt="Вперед на 15 секунд"
            />
            <img
              onClick={download}
              className="Story__track-button"
              src={downloadIcon}
              alt="Скачать"
            />
          </div>
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
        <img src={image.src} className="Story__poster-image" alt={props.name} />
      </div>
    </section>
  ) : (
    <div className="Preloader">
      <figure className="Preloader__rotator"></figure>
    </div>
  );
}

export default Story;
