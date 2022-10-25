import { renderMultipleChoice_2 } from "../utcf/individual_files/individual_scripts/renderMultipleChoice_2.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->

      <div class="trainerTaskWrapper" id="multipleChoice_2_task-1">
        <div class="multipleChoice_2_Wrapper">
          <div class="multipleChoice_2_List"></div>
        </div>
      </div>
*/
(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "multipleChoice_2_task-1";
  // массив входящих данных (минимум 4, максимум 15 элементов),
  //поле text заполняется по необходимости, если заголовка нет, то ставится ''
  //в поле answerTag заполняется принадлежность к правильному/неправильному ответу
  // поле id должно быть уникально, по нему идет воспроизведение звуков
  const arrayOfElements = [
    {
      id: 1,
      name: "born",
      answerTag: "right",
      audioSrc: "sound/mc-sound-soundText/DO_3-4_17_2_9.mp3",
      text: "В лесу родилась ёлочка",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю name  в массиве
  const rightAnswer = "right";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMultipleChoice_2(arrayOfElements, rightAnswer, taskId);
})();
