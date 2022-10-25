import { renderSingleChoice_4_Markup } from "../utcf/individual_files/individual_scripts/renderSingleChoice_4_Markup.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper">
        <div class="singleChoice_4_Wrapper" id="singleChoice_4_task-2">
          <div class="singleChoice_4_List"></div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "singleChoice_4_task-1";
  // массив входящих вариантов ответа(звуков) (максимум 5-6 элементов),
  // поле text заполняется по необходимости, если надписи у звука нет, то ставится ''
  // поле id должно быть уникальным, по нему происходит воспроизведение звуков
  // в поле answerTag заполняется принадлежность к правильному/неправильному ответу, правильное значение указывается ниже
  const arrayOfElements = [
    {
      id: 1,
      text: "Зонтиков больше, чем дождевиков.",
      audioSrc: "sound/singleChoice_4/005.mp3",
      answerTag: "wrong",
    },
  ];

  // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
  const rightAnswer = "right";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSingleChoice_4_Markup(arrayOfElements, rightAnswer, taskId);
})();
