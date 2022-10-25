import { renderSingleChoiсe_2_Markup } from "../utcf/individual_files/individual_scripts/renderSingleChoiсe_2_Markup.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="singleChoiсe_2_task-2">
        <div class="singleChoiсe_2_task_answers"></div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "singleChoiсe_2_task-1";
  // массив входящих вариантов ответа (максимум 5-6 элементов),

  const answersData = [
    {
      id: 1,
      text: "8", // текст
      audioSrc: "sound/8_s.mp3", // звук опционально, если не нужен, то ставить ""
    },
  ];

  // здесь указывается правильный ответ, он проверяется по полю text  в массиве
  const winVarTask = "10";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSingleChoiсe_2_Markup(answersData, winVarTask, taskId);
})();
