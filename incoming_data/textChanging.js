import { renderEditableSentences } from "../utcf/individual_files/individual_scripts/renderEditableSentences.js";

/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="editableSentences_task-1">
        <div class="editableSentences_textChanging_sentences"></div>
      </div>
*/
(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "editableSentences_task-1";
  //входящий массив с предложениями
  //максимальное количество предложений в одну строчку 8
  const data = [
    //начало предложения
    [
      {
        id: 1, //id слова
        word: "There", //слово
        status: "true", //верное ли слово
        rightWord: "", //если выше false пишем правильное слово на которое надо будет заменить неправильное
      },
      {
        id: 2,
        word: "were",
        status: "true",
        rightWord: "",
      },
      {
        id: 3,
        word: "dirty",
        status: "false",
        rightWord: "clean",
      },
      {
        id: 4,
        word: "spoons",
        status: "true",
        rightWord: "",
      },
    ], //конец предложения
  ];

  //сама функция, здесь ничего менять не нужно
  renderEditableSentences(data, taskId);
})();
