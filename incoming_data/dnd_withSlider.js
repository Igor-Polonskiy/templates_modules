import {
  renderDndWithSlider
} from "../../../_common_files/renderDndWithSlider.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="task-1">
        <div class="withSlider_comparePicturesWrapper">
          <div class="withSlider_dropPlaceWrapper"></div>
          <div class="withSlider_dragPlaceWrapper">
            <div class="scrollBar_button arrowButton_left_event">
              <div class="scrollBar_arrow scrollBar_arrow_left"></div>
            </div>

            <div class="withSlider_sliderContent">
              <div class="withSlider_slider_box"></div>
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
  // указывается количество верно перетащенных элементов ( или общее количество из dragCards, или любое меньшее число)
  const rightAnswerCount = 8;
  // массив входящих картинок для поля куда переносятся картинки (максимум 5-6 элементов),
  // в поле answerTag указывается ключевое слово для сопаставления поля для сбрасывания и картинки для сбрасывания
  const dropCards = [
    {
      id: 1,
      name: "birch",
      imgSrc: "", //'Images_1/DOH_3-4_7_1_2.png',
      answerTag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст loermipsum ksjhfjn wajhfjkn awjkefhujkam juahf;iwj",
    },
    {
      id: 2,
      name: "oak",
      imgSrc: "Images_1/DOH_3-4_7_1_3.png",
      answerTag: "oak",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст",
    },
    // {
    //   id: 3,
    //   name: 'maple',
    //   imgSrc: 'Images_1/DOH_3-4_7_1_4.png',
    //   answerTag: 'maple',
    //   audioSrc: 'sound/dnd_withSlider/007.mp3',
    //   text: ''
    // }
  ];
  //массив входящих картинок для поля откуда картинки будут переноситься(любое количество)(максимум по 3 шт на дро при 4 и более дропах, при 3 и менее - по 6 штук на дроп)
  //в поле answerTag указывается ключевое слово для сопаставления поля для сбрасывания и картинки для сбрасывания
  const dragCards = [
    {
      id: 1,
      name: "mapleLeaf1",
      imgSrc: "Images_1/DOH_3-4_7_1_6.png",
      answerTag: "maple",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "",
    },
    {
      id: 2,
      name: "birchLeaf1",
      imgSrc: "Images_1/DOH_3-4_7_1_7.png",
      answerTag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "",
    },
    {
      id: 3,
      name: "mapleLeaf2",
      imgSrc: "Images_1/DOH_3-4_7_1_8.png",
      answerTag: "maple",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "",
    },
    {
      id: 4,
      name: "oakLeaf2",
      imgSrc: "Images_1/DOH_3-4_7_1_9.png",
      answerTag: "oak",
      audioSrc: "sound/dnd_withSlider/008.mp3",
      text: "текст джлавмылдаьм ждышлвоа дфло",
      // text: "текст ",
    },
    {
      id: 5,
      name: "birchLeaf1",
      imgSrc: "Images_1/DOH_3-4_7_1_10.png",
      answerTag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст",
    },
    {
      id: 6,
      name: "oakLeaf3",
      imgSrc: "Images_1/DOH_3-4_7_1_11.png",
      answerTag: "oak",
      audioSrc: "sound/dnd_withSlider/008.mp3",
      text: "текст",
    },
    {
      id: 7,
      name: "birchLeaf2",
      imgSrc: "Images_1/DOH_3-4_7_1_12.png",
      answerTag: "birch",
      audioSrc: "sound/dnd_withSlider/007.mp3",
      text: "текст",
    },
    {
      id: 8,
      name: "mapleLeaf3",
      imgSrc: "Images_1/DOH_3-4_7_1_13.png",
      answerTag: "maple",
      audioSrc: "sound/dnd_withSlider/009.mp3",
      text: "текст",
    },
  ];


  renderDndWithSlider(dropCards, dragCards, taskId, rightAnswerCount);
})();

