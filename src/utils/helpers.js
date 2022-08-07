export const newgame = (arr) => {
  let random = Math.random();
  let rand = Math.floor(random * 16);
  for (let i = 0; i < arr.length; i++) {
    arr[i].number = "";
    arr[i].back = "white";
    arr[i].size = "10vmin";
    arr[i].color = "black";
  }
  arr[rand].number = 2;
};

export const getNewNumber = () => {
  let random = Math.random();

  if (random > 0.85) {
    return 4;
  } else {
    return 2;
  }
};

export function styler(array) {
  array.forEach((item) => {

    if (item.number < 65) {
      item.back = `rgb(${255 - item.number * 4}, 255, 255)`;
    } else if (item.number > 65 && item.number < 1024) {
      item.back = `rgb(0, ${255 - item.number / 4}, 255)`;
    } else if (item.number > 1023) {
      item.back = `rgb(0, 0, ${255 - item.number / 64})`;
    } else {
      item.back = "white";
    }

    if (item.number > 9999) {
      item.size = "5vmin";
    } else if (item.number > 999) {
      item.size = "7vmin";
    } else {
      item.size = "10vmin";
    }

    if (item.number > 2000) {
      item.color = "white";
    } else {
      item.color = "black";
    }
  });
}

export function allNumbers(array) {
  let allCells = array.map((item) => {
    return item.number;
  });
  let allNumbs = allCells.filter((item) => {
    return typeof item === "number";
  });
  return allNumbs;
}

export function toVertical(
  array,
  firstLine,
  secondLine,
  thirdLine,
  fourthLine
) {
  firstLine[0] = array[0].number;
  firstLine[1] = array[4].number;
  firstLine[2] = array[8].number;
  firstLine[3] = array[12].number;
  secondLine[0] = array[1].number;
  secondLine[1] = array[5].number;
  secondLine[2] = array[9].number;
  secondLine[3] = array[13].number;
  thirdLine[0] = array[2].number;
  thirdLine[1] = array[6].number;
  thirdLine[2] = array[10].number;
  thirdLine[3] = array[14].number;
  fourthLine[0] = array[3].number;
  fourthLine[1] = array[7].number;
  fourthLine[2] = array[11].number;
  fourthLine[3] = array[15].number;
}

export function toHorizontal(
  array,
  firstLine,
  secondLine,
  thirdLine,
  fourthLine
) {
  firstLine[0] = array[0].number;
  firstLine[1] = array[1].number;
  firstLine[2] = array[2].number;
  firstLine[3] = array[3].number;
  secondLine[0] = array[4].number;
  secondLine[1] = array[5].number;
  secondLine[2] = array[6].number;
  secondLine[3] = array[7].number;
  thirdLine[0] = array[8].number;
  thirdLine[1] = array[9].number;
  thirdLine[2] = array[10].number;
  thirdLine[3] = array[11].number;
  fourthLine[0] = array[12].number;
  fourthLine[1] = array[13].number;
  fourthLine[2] = array[14].number;
  fourthLine[3] = array[15].number;
}

export function fromVertical(
  array,
  firstLine,
  secondLine,
  thirdLine,
  fourthLine
) {
  array[0].number = firstLine[0];
  array[4].number = firstLine[1];
  array[8].number = firstLine[2];
  array[12].number = firstLine[3];
  array[1].number = secondLine[0];
  array[5].number = secondLine[1];
  array[9].number = secondLine[2];
  array[13].number = secondLine[3];
  array[2].number = thirdLine[0];
  array[6].number = thirdLine[1];
  array[10].number = thirdLine[2];
  array[14].number = thirdLine[3];
  array[3].number = fourthLine[0];
  array[7].number = fourthLine[1];
  array[11].number = fourthLine[2];
  array[15].number = fourthLine[3];
}
export function fromHorizontal(
  array,
  firstLine,
  secondLine,
  thirdLine,
  fourthLine
) {
  array[0].number = firstLine[0];
  array[1].number = firstLine[1];
  array[2].number = firstLine[2];
  array[3].number = firstLine[3];
  array[4].number = secondLine[0];
  array[5].number = secondLine[1];
  array[6].number = secondLine[2];
  array[7].number = secondLine[3];
  array[8].number = thirdLine[0];
  array[9].number = thirdLine[1];
  array[10].number = thirdLine[2];
  array[11].number = thirdLine[3];
  array[12].number = fourthLine[0];
  array[13].number = fourthLine[1];
  array[14].number = fourthLine[2];
  array[15].number = fourthLine[3];
}

export function oldArrayString(array) {
  let startNumbers = array.slice().map((i) => {
    return i.number;
  });
  return startNumbers.join();
}
