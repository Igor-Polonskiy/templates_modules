import {
  renderDndOneToOneMarkup
} from "../../../_common_files/renderDndOneToOneMarkup.js";

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
   <div class="trainerTaskWrapper" id="task-1">
        <div class="dnd_OneToOne_comparePicturesWrapper">
          <div class="dnd_OneToOne_dropPlaceWrapper"></div>
          <div class="dnd_OneToOne_dragPlaceWrapper"></div>
        </div>
      </div>
 */

(() => {
  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"

  // массивы входящих картинок (максимум 5-6 элементов),
  // опционально заполняются:
  // 1) поле imgSrc, imgSrc_2 - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля title, title_2 - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc,audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) в у элементов, которые перетаскиваются соответственно
  // 4) bgSrc - когда нужно, чтобы часть полей в области для перетаскивания уже была заполнена изображениями (дроп)
  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение на оба массива с данными, по которому воспроизводятся звуки
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать
  // Если перемещаемые элементы просто нужно сопоставить с другими (без строгих ограничений), то в поле answerTag прописать одинаковые слова

  const arrayOfDropElements = [
    {
      id: 1,
      name: "birch",
      imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_1.jpg",
      bgSrc: "",
      audioSrc: "sound/dnd_OneToOne/007.mp3",
      title: "Берёза",
      answerTag: "birch",
    },
    {
      id: 2,
      name: "spruce",
      imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_2.jpg",
      bgSrc: "",
      title: "Ель",
      audioSrc: "sound/dnd_OneToOne/009.mp3",
      answerTag: "spruce",
    },
    {
      id: 3,
      name: "pine",
      imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_3.jpg",
      bgSrc: "",
      title: "Сосна",
      audioSrc: "sound/dnd_OneToOne/011.mp3",
      answerTag: "pine",
    },
    {
      id: 4,
      name: "oak",
      imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_4.jpg",
      bgSrc: "",
      title: "Дуб",
      audioSrc: "sound/dnd_OneToOne/008.mp3",
      answerTag: "oak",
    },
    {
      id: 5,
      name: "maple",
      imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_5.jpg",
      bgSrc: "",
      title: "Клён",
      audioSrc: "sound/dnd_OneToOne/012.mp3",
      answerTag: "maple",
    },
    {
      id: 6,
      name: "aspen",
      imgSrc: "Images_1/dnd_OneToOne/DO_3-4_10_1_6.jpg",
      bgSrc: "",
      title: "Осина",
      audioSrc: "sound/dnd_OneToOne/013.mp3",
      answerTag: "aspen",
    },
  ];
  const arrayOfDragElements = [
    {
      id: 7,
      name: "birch",
      imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_7.jpg",
      audioSrc_2: "sound/dnd_OneToOne/007.mp3",
      title_2: "Берёза",
      answerTag: "birch",
    },
    {
      id: 8,
      name: "spruce",
      imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_8.jpg",
      title_2: "Ель",
      audioSrc_2: "sound/dnd_OneToOne/009.mp3",
      answerTag: "spruce",
    },
    {
      id: 9,
      name: "pine",
      imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_9.jpg",
      title_2: "Сосна",
      audioSrc_2: "sound/dnd_OneToOne/011.mp3",
      answerTag: "pine",
    },
    {
      id: 10,
      name: "oak",
      imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_10.jpg",
      title_2: "Дуб",
      audioSrc_2: "sound/dnd_OneToOne/008.mp3",
      answerTag: "oak",
    },
    {
      id: 11,
      name: "maple",
      imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_11.jpg",
      title_2: "Клён",
      audioSrc_2: "sound/dnd_OneToOne/012.mp3",
      answerTag: "maple",
    },
    {
      id: 12,
      name: "aspen",
      imgSrc_2: "Images_1/dnd_OneToOne/DO_3-4_10_1_12.jpg",
      title_2: "Осина",
      audioSrc_2: "sound/dnd_OneToOne/013.mp3",
      answerTag: "aspen",
    },
  ];


  // сама функция, которая запускается, здесь ничего менять не нужно
  // renderDndOneToOneMarkup(arrayOfElements, taskWrapper, imageFolder);
  renderDndOneToOneMarkup(arrayOfDropElements, arrayOfDragElements, taskId);
})();
