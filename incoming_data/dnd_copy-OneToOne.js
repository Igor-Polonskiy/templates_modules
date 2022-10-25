import {
  renderDndCopyOneToOneMarkup
} from "../../../_common_files/renderDndCopyOneToOneMarkup.js";



//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/*
div class="trainerTaskWrapper" id="task-1">
        <div class="dnd_copy-OneToOne_comparePicturesWrapper">
          <div class="dnd_copy-OneToOne_dropPlaceWrapper"></div>
          <div class="dnd_copy-OneToOne_dragPlaceWrapper"></div>
        </div>
      </div>
 */

(() => {
  // перетаскивание происходит посредством копирования
  // массивы входящих картинок (максимум 5-6 элементов),
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля title, titleTwo - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc, audioSrcTwo - если нужна озвучка в полях для перетаскивания (дроп) в у элементов, которые перетаскиваются соответственно
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение на оба массива с данными, по которому воспроизводятся звуки
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"

  // указывается количество верно перетащенных элементов (или общее количество из arrayOfDragElements, или любое меньшее число)
  const rightCount = 5;

  const arrayOfDropElements = [
    {
      id: 1,
      name: "mother",
      imgSrc: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_24.png",
      bgSrc: "",
      audioSrc: "", //"sound/dnd_copy-OneToOne/007.mp3",
      title: "",
      answerTag: "adult",
    },
    {
      id: 2,
      name: "father",
      imgSrc: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_25.png",
      bgSrc: "",
      title: "",
      audioSrc: "",
      answerTag: "adult",
    },
    {
      id: 3,
      name: "son",
      imgSrc: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_26.png",
      bgSrc: "",
      title: "",
      audioSrc: "",
      answerTag: "child",
    },
    {
      id: 4,
      name: "dauther",
      imgSrc: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_27.png",
      bgSrc: "",
      title: "",
      audioSrc: "",
      answerTag: "child",
    },
    {
      id: 5,
      name: "grandmother",
      imgSrc: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_28.png",
      bgSrc: "",
      title: "",
      audioSrc: "",
      answerTag: "adult",
    },
  ];
  const arrayOfDragElements = [
    {
      id: 7,
      name: "big-cake",
      imgSrc_2: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_29.png",
      audioSrcTwo: "",
      titleTwo: "",
      answerTag: "adult",
    },
    {
      id: 8,
      name: "small-cake",
      imgSrc_2: "Images_1/dnd_copy-OneToOne/DOH_3-4_13_3_30.png",
      titleTwo: "",
      audioSrcTwo: "",
      answerTag: "child",
    },
  ];


  // сама функция, которая запускается, здесь ничего менять не нужно
  renderDndCopyOneToOneMarkup(
    arrayOfDropElements,
    arrayOfDragElements,
    taskId,
    rightCount
  );
})();