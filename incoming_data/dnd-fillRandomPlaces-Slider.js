import {
  renderDndFillRandomPlacesSlider
} from "../../../_common_files/renderDndFillRandomPlacesSlider.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="task-1">
        <div class="dnd-fillRandomPlaces-Slider_comparePicturesWrapper">
          <div class="dnd-fillRandomPlaces-Slider_dropPlaceWrapper"></div>
          <div class="dnd-fillRandomPlaces-Slider_dragPlaceWrapper">
            <div class="scrollBar_button arrowButton_left_event">
              <div class="scrollBar_arrow scrollBar_arrow_left"></div>
            </div>

            <div class="dnd-fillRandomPlaces-Slider_sliderContent">
              <div class="dnd-fillRandomPlaces-Slider_slider_box"></div>
            </div>
            <div class="scrollBar_button arrowButton_right_event">
              <div class="scrollBar_arrow scrollBar_arrow_right"></div>
            </div>
          </div>
        </div>
      </div>
*/

(() => {
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"

  // указывается количество верно перетащенных элементов ( или общее количество из arrayOfDragElements, или любое меньшее число)
  const rightCount = 7;
  // порядок перетаскивания: несколько картинок(максимум по 4) в одно поле
  // массивы входящих данных:
  // 1) arrayOfDropElements:
  //    a) минимум 1 максимум 4 элемента
  //    б) поле orientation заполняется 'v' - если поле будет вертикально расположено или будет всего 1, 'h' - если горизонтально
  //    в) поле answerTag должно быть уникальным и обязательно к заполнению

  // 2) arrayOfDragElements:
  //    а)- любое количество элементов,
  //    б) в поле answerTag указывается принадлежность к полю, куда перетаскивать, если элемент не нужно перетаскивать, указывается ''

  const arrayOfDropElements = [
    {
      id: "1",
      answerTag: "1",
      orientation: "v",
    },
    {
      id: "2",
      answerTag: "2",
      orientation: "h",
    },
    {
      id: "3",
      answerTag: "3",
      orientation: "h",
    },
    {
      id: "4",
      answerTag: "4",
      orientation: "v",
    },
  ];

  const arrayOfDragElements = [
    {
      id: 1,
      name: "blue_shirt",
      answerTag: "3",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_17.png",
    },
    {
      id: 2,
      name: "red_shirt",
      answerTag: "2",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_19.png",
    },
    {
      id: 3,
      name: "red_shirt",
      answerTag: "2",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_20.png",
    },
    {
      id: 4,
      name: "yellow_shirt",
      answerTag: "1",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_21.png",
    },
    {
      id: 5,
      name: "yellow_shirt",
      answerTag: "1",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_22.png",
    },
    {
      id: 6,
      name: "green_shirt",
      answerTag: "4",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_23.png",
    },
    {
      id: 7,
      name: "green_shirt",
      answerTag: "4",
      imgSrc: "Images_1/dnd-fillRandomPlaces-Slider/DOH_3-4_13_4_24.png",
    },
  ];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderDndFillRandomPlacesSlider(
    arrayOfDropElements,
    arrayOfDragElements,
    taskId,
    rightCount
  );
})();
