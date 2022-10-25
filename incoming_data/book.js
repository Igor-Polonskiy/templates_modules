import { renderBookMarkup } from "../utcf/individual_files/individual_scripts/renderBookMarkup.js";

// вставить в html
/* <div class="trainerTaskWrapper" id="interactiveBook_task-1">
  <div class="interactiveBook_book-background">
    <div id="interactiveBook_book" class="interactiveBook_book"></div>
  </div>
 </div> */

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "interactiveBook_task-1";
  // массив с данными по каждой странице
  // id и name должны быть уникальными, по ним идет воспроизведение звуков
  // pageNumber -  указывается порядковый номер страницы (0 - для обложки, и далее по порядку)
  // imgSrc - заполняется по необходимости, если есть изображение на странице, если его нет, то ставится ''
  // text - заполняется по необходимости, если есть текст, если его нет, то ставится ''. Если в тексте нужен перенос на новую строку (абзац), то в месте переноса ставить тег <br>. Если текст расположен под картинкой, то туда можно поместить максимум 4 строчки
  // audioSrc и audioSrc_2 - для звуков на странице, указываются пути к аудиофайлам, на 1 странице аудио может быть 2, расоложены друг под другом, разделяются текстом, заполняются по необходимости, если не нужны, то ставится ''

  const bookPages = [
    {
      id: 1,
      pageNumber: 0,
      name: "bookTitle",
      imgSrc: "Images_1/book/DOH_3-4_28_5_2.png",
      text: "Волк и семеро козлят",
      audioSrc: "",
      audioSrc_2: "",
    },
    {
      id: 2,
      pageNumber: 1,
      name: "bookPage1",
      imgSrc: "Images_1/book/DOH_3-4_28_5_2.png",
      text: "Уж тает снег, бегут ручьи,<br>В окно повеяло весною...",
      audioSrc: "sound/book/002.mp3",
      audioSrc_2: "sound/book/002.mp3",
    },
  ];

  // заполняются пути к картинкам - обложке книги, разворота книги, страницы книги
  const bookDesign = {
    bookCover: "Images_1/obl.png",
    bookSpread: "Images_1/podlojka.png",
    bookPaper: "Images_1/paper.png",
  };

  // вызов функции, менять ничего не нужно
  renderBookMarkup(bookPages, taskId, bookDesign);
})();
