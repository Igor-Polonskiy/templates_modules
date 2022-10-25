import {
  renderImagesChronologyMarkup
} from "../../../_common_files/renderImagesChronologyMarkup.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
 <div class="trainerTaskWrapper" id="dnd_chronology_task-1">
        <div class="chronoDndWrapper">
          <div class="chronoDropPlace"></div>
          <div class="chronoDragPlace"></div>
        </div>
    </div>

 */

(() => {
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId ="dnd_chronology_task-1"
  // массив входящих картинок (максимум 5-6 элементов),
  // в поле answerTag указывается порядковый номер картинки в правильном ответе
  const arrayOfElements = [
    {
      id: 1,
      answerTag: "1",
      imgSrc: "Images_1/dnd_chronology/DOH_3-4_5_5_16.png",
    },
    {
      id: 2,

      answerTag: "2",
      imgSrc: "Images_1/dnd_chronology/DOH_3-4_5_5_15.png",
    },
    {
      id: 3,
      answerTag: "3",

      imgSrc: "Images_1/dnd_chronology/DOH_3-4_5_5_18.png",
    },
    {
      id: 4,
      answerTag: "4",
      imgSrc: "Images_1/dnd_chronology/DOH_3-4_5_5_17.png",
    },
    // {
    //   id: 3,
    //   answerTag: "3",

    //   imgSrc: "Images_1/dnd_chronology/DOH_3-4_5_5_18.png",
    // },
    // {
    //   id: 4,
    //   answerTag: "4",
    //   imgSrc: "Images_1/dnd_chronology/DOH_3-4_5_5_17.png",
    // },
  ];

  renderImagesChronologyMarkup(arrayOfElements, taskId);
})();
