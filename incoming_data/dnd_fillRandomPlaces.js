import {
  renderDnDFillRandomPlacesMarkup
} from "../utcf/individual_files/individual_scripts/renderDnDFillRandomPlacesMarkup.js";

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
  <div class="trainerTaskWrapper" id="task-1">
        <div class="dnd_fillRandomPlaces_dropPlaceWrapper"></div>
        <div class="dnd_fillRandomPlaces_dragPlaceWrapper"></div>
      </div>
 */

(() => {
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"
  // порядок перетаскивания: одна картинка в одно поле
  // массивы входящих данных:
  // 1) arrayOfDropElements - минимум 3 максимум 9 элементов:
  //    а) поле imgSrc заполняется опционально, если нужен фон для поля для перетаскивания или между, если не нужен оставлять ''
  //    б) поле answerTag заполняется для тех полей, в которые будет происходить перетаскивание элементов, если нет, то оставить ''

  // 2) arrayOfDragElements - максимум 6 элементов, в поле answerTag указывается принадлежность к полю, куда перетаскивать

  // поля answerTag для каждой пары данных должны быть уникальны

  const arrayOfDropElements = [
    {
      id: 1,
      name: "",
      answerTag: "",
      imgSrc: "",
    },
    {
      id: 2,
      name: "",
      answerTag: "2",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_7.png",
    },
    {
      id: 3,
      name: "",
      answerTag: "",
      imgSrc: "",
    },
    {
      id: 4,
      name: "",
      answerTag: "4",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_8.png",
    },
    {
      id: 5,
      name: "",
      answerTag: "",
      imgSrc: "",
    },
    {
      id: 6,
      name: "",
      answerTag: "6",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_9.png",
    },
    {
      id: 7,
      name: "",
      answerTag: "",
      imgSrc: "",
    },
    {
      id: 8,
      name: "",
      answerTag: "8",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_10.png",
      // imgSrc: "",
    },
    {
      id: 9,
      name: "",
      answerTag: "",
      imgSrc: "",
      // imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_10.png",
    },
  ];
  const arrayOfDragElements = [
    {
      id: 1,
      name: "red_fish",
      answerTag: "6",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_11.png",
    },
    {
      id: 2,
      name: "blue_fish",
      answerTag: "4",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_12.png",
    },
    {
      id: 3,
      name: "yellow_fish",
      answerTag: "2",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_13.png",
    },
    {
      id: 4,
      name: "green_fish",
      answerTag: "8",
      imgSrc: "Images_1/dnd_fillRandomPlaces/DOH_3-4_32_3_14.png",
    },
  ];

  

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderDnDFillRandomPlacesMarkup(
    arrayOfDropElements,
    arrayOfDragElements,
    taskId
  );
})();
