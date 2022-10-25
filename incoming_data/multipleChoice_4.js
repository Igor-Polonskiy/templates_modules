import { renderMultipleChoice_4 } from "../utcf/individual_files/individual_scripts/renderMultipleChoice_4.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->

      <div class="trainerTaskWrapper" id="multipleChoice_4_task-2">
        <div class="multipleChoice_4_Wrapper">
          <div class="multipleChoice_4_List"></div>
        </div>
      </div>
*/
(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "multipleChoice_4_task-2";
  // массив входящих звуков (минимум 4, максимум 15 элементов),
  //поле text заполняется по необходимости, если заголовка у картинки нет, то ставится ''
  //в поле answerTag заполняется принадлежность к правильному/неправильному ответу
  // поле name должно быть уникально, по нему идет воспроизведение звуков
  const arrayOfElements = [
    {
      id: 1,
      name: "born",
      answerTag: "right",
      audioSrc: "sound/multipleChoice_4/DO_3-4_17_2_9.mp3",
      text: "В лесу родилась ёлочка",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю name  в массиве
  const rightAnswer = "right";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMultipleChoice_4(arrayOfElements, rightAnswer, taskId);
})();
