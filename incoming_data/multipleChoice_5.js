import { renderMultipleChoice_5 } from "../utcf/individual_files/individual_scripts/renderMultipleChoice_5.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="multipleChoice_5_task-1">
        <div class="multipleChoice_5_VideoWrapper">
          <div class="multipleChoice_5_VideoList"></div>
        </div>
      </div>
      */

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "multipleChoice_5_task-1";
  // массив входящих звуков (минимум 4, максимум 6 элементов),
  // поле text заполняется по необходимости, если текста нет, то ставится ''
  //в поле answerTag заполняется принадлежность к правильному/неправильному ответу

  const arrayOfElements = [
    {
      id: 1,
      answerTag: "many",
      videoSrc: "media/multipleChoice_5/DOH_3-4_31_3_1.mp4",
      text: "Заяц",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю name  в массиве
  const rightAnswer = "many";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderMultipleChoice_5(arrayOfElements, rightAnswer, taskId);
})();
