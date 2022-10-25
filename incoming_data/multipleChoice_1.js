import { renderMultipleChoice_1 } from "../utcf/individual_files/individual_scripts/renderMultipleChoice_1.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="multipleChoice_1_task-1">
        <div class="multipleChoice_1_wrapper">
          <div class="multipleChoice_1_inputList"></div>
        </div>
      </div>
*/

(() => {
  //уникальный id задания как в HTML
  const taskId = "multipleChoice_1_task-2";
  //входящие данные
  //поле audioSrc - опционально(если не надо оставляем пустые кавычки)
  const data = [
    {
      id: 1,
      text: "шапка снега",
      audioSrc: "sound/8045.mp3",
      answerTag: "true",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
  const rightAnswer = "true";

  renderMultipleChoice_1(data, taskId, rightAnswer);
})();
