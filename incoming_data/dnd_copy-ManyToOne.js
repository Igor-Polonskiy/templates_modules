import {
  renderDndCopyManyToOneMarkup
} from "../../../_common_files/renderDndCopyManyToOneMarkup.js";

//шаблон для вставки в HTML
//ПОМЕНЯЙ id НА УНИКАЛЬНЫЙ
/**
  <div class="trainerTaskWrapper" id="task-1">
        <div class="dnd_copy-ManyToOne_comparePicturesWrapper">
          <div class="dnd_copy-ManyToOne_dropPlaceWrapper"></div>

          <div class="dnd_copy-ManyToOne_dragPlaceWrapper"></div>
        </div>
    
      </div>
 */

(() => {

  // структура ответа: answerTag:число
  const answer = {
    triangle: 4,
  };

  // это контейнер для данного задания, для каждого нужно будет вписывать свой id, который был присвоен в html
  const taskId = "task-1"

  // перетаскивание происходит посредством копирования
  // в одно поле можно перетащить несколько элементов
  // массивы входящих элементов (сверху - максимум 4, снизу - максимум 6),
  // опционально заполняются:
  // 1) поле imgSrc, imgSrcTwo - если нужна картинка в том элементе, который перетаскивается  или к которому перетаскивают
  // 2) поля text - если нужен заголовок в полях для перетаскивания (дроп) и в элементе для перетаскивания (драг) соответственно
  // 3) audioSrc, audioSrc_2 - если нужна озвучка в полях для перетаскивания (дроп) в у элементов, которые перетаскиваются соответственно

  // Если какие-то поля не нужны, то ставится ''
  // в поле answerTag пишется уникальное слово, по которому сверяется правильность сопоставления
  // в поле id пишется уникальное значение на оба массива с данными, по которому воспроизводятся звуки
  // Каждый объект - это данные о элементе: который будет перемещаться или к которому будут перемещать

  const arrayOfDropElements = [
    {
      id: 1,
      name: "roof",
      imgSrc: "Images_1/dnd_copy-ManyToOne/DOH_3-4_29_3_4.png",
      answerTag: "triangle",
      audioSrc: "sound/triangle.mp3",
      text: "",
    },
  ];
  const arrayOfDragElements = [
    {
      id: 2,
      name: "green-triangle",
      answerTag: "triangle",
      imgSrc: "Images_1/dnd_copy-ManyToOne/DOH_3-4_29_3_6.png",
      text: "",
      audioSrc_2: "",
    },
  ];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderDndCopyManyToOneMarkup(
    arrayOfDropElements,
    arrayOfDragElements,
    taskId,
    answer
  );
})();
