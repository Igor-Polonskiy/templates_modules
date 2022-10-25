import { renderMemoryGameMarkup } from "../utcf/individual_files/individual_scripts/renderMemoryGameMarkup.js";

// вставить в html
/*
 <div class="trainerTaskWrapper" id="memoryCards_1_task-1">
        <div class="memoryCards_1_memoryCardsWrapper"></div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "memoryCards_1_task-1";
  // массив входящих картинок (от 6 до 10 элементов),
  // поля imgSrc, text заполняются опционально, если контента нет, оставлять ''
  // в поле answerTag вписывается слово по которому будет сверяться правильность выбранных карточек
  const arrayOfElements = [
    {
      id: 1,
      name: "pinkTowelOne",
      imgSrc: "Images_18/memoryGame/DOH_3-4_24_2_8.png",
      text: "",
      answerTag: "pink",
    },
  ];

  // указывается путь к картинке - обложке
  const coverImage = "Images_18/memoryGame/question_back_img.png";

  renderMemoryGameMarkup(arrayOfElements, taskId, coverImage);
})();
