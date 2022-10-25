import { renderTextOrder } from "../utcf/individual_files/individual_scripts/renderTextOrder.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="wordOrderInSentences_task-1">
        <div class="wordOrderInSentences_textOrder">
          <div class="wordOrderInSentences_sentences"></div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "wordOrderInSentences_task-1";

  //массив с предложениями, слова в правильном порядке(потом перемешиваются с помощью скрипта) можно добавить до 10 предложений
  const data = [
    ["There", "was", "not", "a", "cooker", "in", "the", "kitchen"],
    ["There", "were", "not", "any", "plates", "in", "the", "fridge"],
    ["There", "was", "not", "any", "salad", "on", "my", "plate"],
    ["There", "were", "not", "any", "children", "in", "the", "living", "room"],
  ];

  //сама функция, здесь ничего менять не нужно
  renderTextOrder(data, taskId);
})();
