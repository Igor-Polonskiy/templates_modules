import { renderSingleChoice_1 } from "../utcf/individual_files/individual_scripts/renderSingleChoice_1.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="singleChoice_1_task-3">
        <div class="singleChoice_1_wrapper">
          <div class="singleChoice_1_inputList"></div>
        </div>
      </div>
 */

(() => {
  //уникальный id задания как в HTML
  const taskId = "singleChoice_1_task-3";
  //входящие данные
  //поле audioSrc - опционально(если не надо оставляем пустые кавычки)
  const data = [
    {
      id: 1,
      text: "шапка снега",
      audioSrc: "sound/8045.mp3",
    },
    {
      id: 2,
      text: "столовое серебро",
      audioSrc: "sound/8053.mp3",
    },
    {
      id: 3,
      text: "чугунная голова",
      audioSrc: "sound/8060.mp3",
    },
    {
      id: 4,
      text: "дождь барабанит по крыше",
      audioSrc: "sound/8067.mp3",
    },
  ];
  //правильный ответ
  const rightAnswer = "шапка снега";

  renderSingleChoice_1(data, taskId, rightAnswer);
})();
