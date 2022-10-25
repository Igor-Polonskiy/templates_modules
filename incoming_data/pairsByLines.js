import { renderFindCoupleByLines } from "../utcf/individual_files/individual_scripts/renderFindCoupleByLines.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="findCoupleByLines_1_task-1">
        <div class="findCoupleByLines_1_findCouple">
          <div class="findCoupleByLines_1_findCouple_table">
            <div class="findCoupleByLines_1_findCouple_left"></div>
            <div class="findCoupleByLines_1_findCouple_right"></div>
          </div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "findCoupleByLines_1_task-1";
  // id-порядковый номер
  // textLeft - слово/предложение в левой колонке
  // audioSrc - озвучка текста для левой колонки;
  // textRight - слово/предложение в правой колонке
  // audioSrc_2 -озвучка текста для правой колонки;
  //максимальное количество слов 10 если вмещается в 1 строку
  const data = [
    {
      id: 1,
      textLeft: "bat",
      audioSrc: "sound/bat.mp3",
      textRight: "летучая мышь",
      audioSrc_2: "sound/bat-2.mp3",
    },
  ];

  renderFindCoupleByLines(data, taskId);
})();
