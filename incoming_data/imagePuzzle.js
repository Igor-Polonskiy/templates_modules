import { renderImagesPuzzleMarkup } from "../utcf/individual_files/individual_scripts/renderImagesPuzzleMarkup.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="dnd_imagesPuzzle_task-1">
        <div class="dnd_imagesPuzzle_comparePicturesWrapper">
          <div class="dnd_imagesPuzzle_puzzleWrapper">
            <div class="dnd_imagesPuzzle_dropPlaceWrapper"></div>
          </div>
          <div class="dnd_imagesPuzzle_dragPlaceWrapper">
            <div class="scrollBar_button arrowButton_left_event">
              <div class="scrollBar_arrow scrollBar_arrow_left"></div>
            </div>

            <div class="dnd_imagesPuzzle_sliderContent">
              <div class="dnd_imagesPuzzle_slider_box"></div>
            </div>
            <div class="scrollBar_button arrowButton_right_event">
              <div class="scrollBar_arrow scrollBar_arrow_right"></div>
            </div>
          </div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "dnd_imagesPuzzle_task-1";
  // в поле answerTag заполняется номер ячейки слева направо сверху вниз начиная с 1
  // если в процессе сбора картинки участвуют не все кусочки, то лишние кусочки нумеруются любыми другими числами
  // arrayOfDragElements - массив с частями-картинками (любое количество), из которых будет собираться одна большая
  // все части картинки должны быть строго квадратами

  const arrayOfDragElements = [
    {
      id: 1,
      name: "bear1",
      imgSrc: "Images_1/imagePuzzle/DOH_3-4_11_3_4.png",
      answerTag: "1",
    },
    {
      id: 2,
      name: "bear2",
      imgSrc: "Images_1/imagePuzzle/DOH_3-4_11_3_5.png",
      answerTag: "2",
    },
  ];

  // картинка-подсказка (если не нужна, то оставить '')
  const previewImage = "Images_1/imagePuzzle/house.png";

  // заполняется для правильного отображения сетки, где собирается паззл
  // 'v' -  ставится, если картинка вертикальная и количество полей (3, 4, 6, 9)
  // 'h' - если горизонтальная и количество полей (3, 6, 8, 12)
  const orientation = "v";

  // указывается количество полей для заполнения (любое количество от 3 до 12)
  const numberOfPuzzlePieces = 4;

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderImagesPuzzleMarkup(
    arrayOfDragElements,
    taskId,
    previewImage,
    numberOfPuzzlePieces,
    orientation
  );
})();
