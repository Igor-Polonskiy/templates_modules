import {
  renderNumberChronology
} from "../utcf/individual_files/individual_scripts/renderNumberChronology.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
      <div class="trainerTaskWrapper" id="chronoNum_task-1">
        <div class="chronoNum_chronoDndWrapper">
          <div class="chronoNum_dropPlaceWrapper"></div>
          <div class="chronoNum_dragPlaceWrapper"></div>
        </div>
      </div>
 */

(() => {
   // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
   const taskId = "chronoNum_task-1"
  // массив входящих данных (максимум 9-10 элементов),
  // в поле text указывается число
  // в поле answerTag указывается наличие(true) или отсутствие(false) элемента для перетаскивания(пропуск)
  const arrayOfElements = [
    {
      id: 1,
      text: "1",
      answerTag: "true",
    },
    {
      id: 2,
      text: "2",
      answerTag: "true",
    },
    {
      id: 3,
      text: "3",
      answerTag: "false",
    },
    {
      id: 4,
      text: "4",
      answerTag: "true",
    },
    {
      id: 5,
      text: "5",
      answerTag: "true",
    },
    {
      id: 6,
      text: "6",
      answerTag: "true",
    },
    {
      id: 7,
      text: "7",
      answerTag: "true",
    },
    {
      id: 8,
      text: "8",
      answerTag: "false",
    },
    {
      id: 9,
      text: "9",
      answerTag: "true",
    },
  ];

  renderNumberChronology(arrayOfElements, taskId);
})();
