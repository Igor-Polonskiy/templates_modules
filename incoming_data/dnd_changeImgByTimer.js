import {
  renderDndChangeImgByTimerMarkup
} from "../../../_common_files/renderDndChangeImgByTimerMarkup.js"

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="task-1">
      <div class="changeImgByTimer_comparePicturesWrapper">
        <div class="changeImgByTimer_dropPlaceWrapper"></div>
        <div class="changeImgByTimer_dragPlaceWrapper"></div>
      </div>
    </div>
 */


// тип тренажера 1
(() => {
  //тип тренажера:
  // 1 - если требуется возврат перетаскиваемой картинки на прежнее место для использования ее дальше
  // 2 - если перетаскиваемая картинка при дальнейшем выполнении задания не участвует

  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"

  //в зависимости от типа тренажера:
  // 1 - в simulatorType указывается true
  // 2 - в simulatorType указывается false
  const simulatorType = true;
  // массив картинок (любое количество при типе тренажера 1, максимум 6 - при типе тренажера 2), к которым будут перетаскиваться другие картинки
  // в поле answerTag заполняется принадлежность к правильному/неправильному ответу
  const dropZoneElements = [
    {
      id: 1,
      name: "picture1",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_2.png",
      answerTag: "negative",
    },
    {
      id: 2,
      name: "picture2",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_3.png",
      answerTag: "negative",
    },
    {
      id: 3,
      name: "picture3",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_4.png",
      answerTag: "positive",
    },
    {
      id: 4,
      name: "picture1",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_7.png",
      answerTag: "negative",
    },
    {
      id: 5,
      name: "picture2",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_8.png",
      answerTag: "positive",
    },
    {
      id: 6,
      name: "picture3",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_9.png",
      answerTag: "negative",
    },
  ];

  // массив перетаскиваемых картинок (от 2 до 6)
  // в поле answerTag заполняется принадлежность к правильному/неправильному ответу
  const dragZoneElements = [
    {
      id: 1,
      name: "positive",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_5.png",
      answerTag: "positive",
    },
    {
      id: 2,
      name: "negative",
      imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_6.png",
      answerTag: "negative",
    },
    // {
    //   id: 1,
    //   name: "positive",
    //   imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_5.png",
    //   answerTag: "positive",
    // },
    // {
    //   id: 2,
    //   name: "negative",
    //   imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_6.png",
    //   answerTag: "negative",
    // },
    // {
    //   id: 1,
    //   name: "positive",
    //   imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_5.png",
    //   answerTag: "positive",
    // },
    // {
    //   id: 2,
    //   name: "negative",
    //   imgSrc: "Images_1/dnd_changeImgByTimer/DOH_3-4_25_2_6.png",
    //   answerTag: "negative",
    // },
  ];


  renderDndChangeImgByTimerMarkup(
    dropZoneElements,
    dragZoneElements,
    taskId,
    simulatorType,
  );
})();

