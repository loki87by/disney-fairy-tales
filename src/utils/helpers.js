import { STORIES } from "./consts";

export function getArticle(name) {
  const num = STORIES.findIndex((i) => i.name === name) + 1;

  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
