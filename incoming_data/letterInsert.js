import {
  renderLetterInsert
} from "../../../_common_files/renderLetterInsert.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="letterInsert_task-1">
        <div class="letterInsert task_wrapper">
          <div class="letterInsert_img"></div>
          <div class="letterInsert_drop"></div>
          <div class="letterInsert_drag"></div>
        </div>
      </div>
*/

(() => {
   //буквы которые можно перетаскивать в слова
   let dragLetters = ["a", "e"];
   // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
   let taskId ="letterInsert_task-1"
  //входящие данные
  //imgSrc: - расположение картинки
  //word - слово
  //answer - буква которую надо вставитиь
  //letters - массив букв из которых состоит слово где пропущенная буква - кавычки без пробела
  let data = [
    {
      imgSrc: "Images_1/letters/cat.png",
      word: "cat",
      answer: "a",
      letters: ["c", "", "t"],
    },
    {
      imgSrc: "Images_1/letters/black.png",
      word: "black",
      answer: "a",
      letters: ["b", "l", "", "c", "k"],
    },
    {
      imgSrc: "Images_1/letters/ten.png",
      word: "ten",
      answer: "e",
      letters: ["t", "", "n"],
    },
    {
      imgSrc: "Images_1/letters/red.png",
      word: "red",
      answer: "e",
      letters: ["r", "", "d"],
    },
    {
      imgSrc: "Images_1/letters/dad.png",
      word: "dad",
      answer: "a",
      letters: ["d", "", "d"],
    },
    {
      imgSrc: "Images_1/letters/hen.png",
      word: "hen",
      answer: "e",
      letters: ["h", "", "n"],
    },
    {
      imgSrc: "Images_1/letters/hat.png",
      word: "hat",
      answer: "a",
      letters: ["h", "", "t"],
    },
    {
      imgSrc: "Images_1/letters/help.png",
      word: "help",
      answer: "e",
      letters: ["h", "", "l", "p"],
    },
  ];
 
  renderLetterInsert(data, taskId, dragLetters);
})();
