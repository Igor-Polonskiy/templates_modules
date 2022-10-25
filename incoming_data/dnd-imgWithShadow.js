import {
  renderImagesWithShadowMarkup
} from "../../../_common_files/renderImagesWithShadowMarkup.js";


//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
<div class="trainerTaskWrapper" id="dnd_imgWithShadow_task-1">
        <div class="dnd_imgWithShadow_comparePicturesWrapper">
          <div class="dnd_imgWithShadow_dropPlaceWrapper"></div>
          <div class="dnd_imgWithShadow_dragPlaceWrapper"></div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "dnd_imgWithShadow_task-1";

  // массив входящих картинок (максимум 5-6 элементов),
  // в поле answerTag указывается уникальное слово, по которому будет сверяться картинка и ее тень
  // в поле imgSrc указывается путь к основной картинке, в srcShadow -  путь к тени картинки, размеры у блоков должны быть одинаковыми (квадрат)
  const arrayOfElements = [
    {
      id: 1,
      answerTag: "eggplant",
      imgSrc: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_13.png",
      srcShadow: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_17.png",
    },
    {
      id: 2,
      answerTag: "tomato",
      imgSrc: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_14.png",
      srcShadow: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_18.png",
    },
    {
      id: 3,
      answerTag: "pear",
      imgSrc: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_15.png",
      srcShadow: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_19.png",
    },
    {
      id: 4,
      answerTag: "cabbage",
      imgSrc: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_16.png",
      srcShadow: "Images_1/dnd-imgWithShadow/DOH_3-4_27_4_20.png",
    },
  ];
  
  // вызов самой функции, ничего менять не нужно
  renderImagesWithShadowMarkup(arrayOfElements, taskId);
})();
