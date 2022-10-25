import { renderMultipleChoice_3 } from "../utcf/individual_files/individual_scripts/renderMultipleChoice_3.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="multipleChoice_3_task-1">
        <div class="multipleChoice_3_Wrapper">
          <div class="multipleChoice_3_List"></div>
        </div>
      </div>
 */

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "multipleChoice_3_task-1";
  // массив входящих картинок (минимум 4, максимум 15 элементов),
  //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
  //поле audioSrc заполняется по необходимости, если заголовка у картинки нет, то ставится ''
  // поле name должно быть уникально, по нему идет воспроизведение звуков
  //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

  const arrayOfElements = [
    {
      id: 1,
      name: "fruits",
      imgSrc: "Images_1/multipleChoice_3/DOH_3-4_25_5_2.png",
      answerTag: "right",
      audioSrc: "sound/multipleChoice_3/002.mp3",
      text: "Фрукты",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю name  в массиве
  const rightAnswer = "right";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId);
})();
