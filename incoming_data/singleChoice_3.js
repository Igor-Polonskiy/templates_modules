import { renderSingleChoice_3_Markup } from "../utcf/individual_files/individual_scripts/renderSingleChoice_3_Markup.js";

// вставить в html
/*
      <div class="trainerTaskWrapper">
        <!-- в поле id указывается уникальный id для данного задания -->
        <div class="singleChoice_3_Wrapper" id="singleChoice_3_task-1">
          <div class="singleChoice_3_List"></div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "singleChoice_3_task-1";
  // массив входящих картинок (максимум 5-6 элементов),
  // поле text, audioSrc  заполняется по необходимости, если надписи или звука нет, то ставится ''
  // в поле answerTag указывается уникальное слово или цифра, по которой будет сверяться правильный ответ
  // в поле id указывается уникальная цифра, по которым воспроизводятся звуки

  const arrayOfElements = [
    {
      id: 1,
      name: "bear",
      imgSrc: "Images_1/singleChoice_3/DO_3-4_21_5_1.jpg",
      text: "Медведь",
      audioSrc: "sound/singleChoice_3/bear.mp3",
      answerTag: "bear",
    },
  ];

  // здесь указывается правильный ответ, он проверяется по полю answerTag  в массиве
  const rightAnswer = "bear";

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSingleChoice_3_Markup(arrayOfElements, rightAnswer, taskId);
})();
