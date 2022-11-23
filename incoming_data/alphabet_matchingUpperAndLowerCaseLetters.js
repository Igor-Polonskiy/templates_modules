import {
  renderAlphabetMatchingUpperAndLowerCaseLetters
} from "../utcf/individual_files/individual_scripts/renderAlphabetMatchingUpperAndLowerCaseLetters.js"


//верстка для вставки в HTML
//не забудь указать уникальный id тренажера !!!
 /*
<div class="trainerTaskWrapper" id="task-1">
        <div class="alphabetWrapper_capital">
          <div class="alphabetDropPlace_capital"></div>
          <div class="alphabetDragPlace_capital"></div>
        </div>
      </div>
*/


(() => {
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"
  // массив с элементыами(буквами) (1 символ), любое количество
  // каждый объект - пара элементов
  // letterCapital - записывается те символы, которые будут вверху тренажера
  // letterSmall - записывается те символы, которые будут внизу тренажера
  // data - уникально для пары элементов, по нему сверяется правильность ответа
  const arrayOfElements = [
    {
      data: "alphCapSmallCapital_1",
      letterCapital: "A",
      letterSmall: "a",
    },
    {
      data: "alphCapSmallCapital_2",
      letterCapital: "B",
      letterSmall: "b",
    },
    {
      data: "alphCapSmallCapital_3",
      letterCapital: "C",
      letterSmall: "c",
    },
    {


      data: "alphCapSmallCapital_4",
      letterCapital: "D",
      letterSmall: "d",
    },
    {
      data: "alphCapSmallCapital_5",
      letterCapital: "E",
      letterSmall: "e",
    },
    {
      data: "alphCapSmallCapital_6",
      letterCapital: "F",
      letterSmall: "f",
    },
    {
      data: "alphCapSmallCapital_7",
      letterCapital: "G",
      letterSmall: "g",
    },
    {
      data: "alphCapSmallCapital_8",
      letterCapital: "H",
      letterSmall: "h",
    },
    {
      data: "alphCapSmallCapital_9",
      letterCapital: "I",
      letterSmall: "i",
    },
    {
      data: "alphCapSmallCapital_10",
      letterCapital: "J",
      letterSmall: "j",
    },
    {
      data: "alphCapSmallCapital_11",
      letterCapital: "K",
      letterSmall: "k",
    },
    {
      data: "alphCapSmallCapital_12",
      letterCapital: "L",
      letterSmall: "l",
    },
    {
      data: "alphCapSmallCapital_13",
      letterCapital: "M",
      letterSmall: "m",
    },
    {
      data: "alphCapSmallCapital_14",
      letterCapital: "N",
      letterSmall: "n",
    },
    {
      data: "alphCapSmallCapital_15",
      letterCapital: "O",
      letterSmall: "o",
    },
    {
      data: "alphCapSmallCapital_16",
      letterCapital: "P",
      letterSmall: "p",
    },
    {
      data: "alphCapSmallCapital_17",
      letterCapital: "Q",
      letterSmall: "q",
    },
    {
      data: "alphCapSmallCapital_18",
      letterCapital: "R",
      letterSmall: "r",
    },
    {
      data: "alphCapSmallCapital_19",
      letterCapital: "S",
      letterSmall: "s",
    },
    {
      data: "alphCapSmallCapital_20",
      letterCapital: "T",
      letterSmall: "t",
    },
    {
      data: "alphCapSmallCapital_21",
      letterCapital: "U",
      letterSmall: "u",
    },
    {
      data: "alphCapSmallCapital_22",
      letterCapital: "V",
      letterSmall: "v",
    },
    {
      data: "alphCapSmallCapital_23",
      letterCapital: "W",
      letterSmall: "w",
    },
    {
      data: "alphCapSmallCapital_24",
      letterCapital: "X",
      letterSmall: "x",
    },
    {
      data: "alphCapSmallCapital_25",
      letterCapital: "Y",
      letterSmall: "y",
    },
    {
      data: "alphCapSmallCapital_26",
      letterCapital: "Z",
      letterSmall: "z",
    },
  ];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderAlphabetMatchingUpperAndLowerCaseLetters(arrayOfElements, taskId);
})();