import {
  renderDnDClosestTopMarkup
} from "../utcf/individual_files/individual_scripts/renderDnDClosestTopMarkup.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="closestTop_task-1">
        <div class="closestTop_comparePicturesWrapper">
          <div class="closestTop_dropPlaceWrapper"></div>
          <div class="closestTop_dragPlaceWrapper"></div>
        </div>
      </div>
*/

(() => {
   // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
   const taskId = "closestTop_task-1"

  // массив входящих картинок (максимум 5-6 элементов),
  // в поле answerTag указывается уникальное слово, по которому будет сверяться картинка и ее часть
  // в поле imgSrc указывается путь к нижней части, в imgSrc_2 -  путь к верхней части картинки

  const arrayOfElements = [
    {
      id: 1,
      name: "blue-house",
      imgSrc: "Images_1/dnd-closestTop/DOH_3-4_27_3_9.png",
      imgSrc_2: "Images_1/dnd-closestTop/DOH_3-4_27_3_7.png",
      answerTag: "blue",
    },
    {
      id: 2,
      name: "green-house",
      imgSrc: "Images_1/dnd-closestTop/DOH_3-4_27_3_10.png",
      imgSrc_2: "Images_1/dnd-closestTop/DOH_3-4_27_3_8.png",
      answerTag: "green",
    },
    {
      id: 3,
      name: "blue-house",
      imgSrc: "Images_1/dnd-closestTop/DOH_3-4_27_3_9.png",
      imgSrc_2: "Images_1/dnd-closestTop/DOH_3-4_27_3_7.png",
      answerTag: "blue",
    },
    {
      id: 4,
      name: "green-house",
      imgSrc: "Images_1/dnd-closestTop/DOH_3-4_27_3_10.png",
      imgSrc_2: "Images_1/dnd-closestTop/DOH_3-4_27_3_8.png",
      answerTag: "green",
    },
    {
      id: 5,
      name: "blue-house",
      imgSrc: "Images_1/dnd-closestTop/DOH_3-4_27_3_9.png",
      imgSrc_2: "Images_1/dnd-closestTop/DOH_3-4_27_3_7.png",
      answerTag: "blue",
    },
    {
      id: 6,
      name: "green-house",
      imgSrc: "Images_1/dnd-closestTop/DOH_3-4_27_3_10.png",
      imgSrc_2: "Images_1/dnd-closestTop/DOH_3-4_27_3_8.png",
      answerTag: "green",
    },
  ];
 
  // вызов самой функции, ничего менять не нужно
  renderDnDClosestTopMarkup(arrayOfElements, taskId);
})();
