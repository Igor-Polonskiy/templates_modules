import { renderSingleChoice_5_Markup } from "../utcf/individual_files/individual_scripts/renderSingleChoice_5_Markup.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="singleChoice_5_task-2">
        <div class="singleChoice_5_Wrapper">
          <div class="singleChoice_5_List"></div>
        </div>
      </div>
*/
(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "singleChoice_5_task-2";
  // массив входящих звуков (минимум 2, максимум 6 элементов),

  // в поле answerTag заполняется принадлежность к правильному/неправильному ответу
  // поле text  - заполняется по необходимости, если текста нет, то ставится ''
  // в поле videoSrc - указывается путь к видео-файлам

  const arrayOfElements = [
    {
      id: 1,
      answerTag: "many",
      videoSrc: "media/singleChoice_5/DOH_3-4_31_3_1.mp4",
      text: "Заяц",
    },
  ];
  // здесь указывается правильный ответ, он проверяется по полю name  в массиве
  const rightAnswer = "many";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSingleChoice_5_Markup(arrayOfElements, rightAnswer, taskId);
})();
