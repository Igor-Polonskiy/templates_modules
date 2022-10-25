import { createСoloringBook_2_Markup } from "../utcf/individual_files/individual_scripts/createСoloringBook_2_Markup";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="coloringBook_2_task-1">
        <div class="coloringBook_2_coloringsWrapper">
          <!-- class="coloringBook_2_coloringImageWrapper" - обязателен на блоке, используется в js -->
          <div class="coloringBook_2_coloringImageWrapper">
            <!-- сюда вставляется svg-картинка раскраски -->
            <!-- у svg class="coloringBook_2_coloringImage" - обязателен, используется в js -->
            <!-- атрибут stoppainting="true" ставится у тех частей g svg, которые не должны закрашиваться -->
            <!-- у каждой части g, которые могут быть закрашены, должен быть атрибут neededcolor="9", в который записывается номер цвета, в который должна -->
            <!-- быть окрашена часть рисунка, расшифровка цвета заносится в js-файл в объект rightAnswers , также он используется в js при проверке-->

            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 1190.551 841.891"
              enable-background="new 0 0 1190.551 841.891"
              xml:space="preserve"
              class="coloringBook_2_coloringImage"
            >
              <g
                id="yell_3_"
                stroke-width="2"
                stroke="white"
                fill="white"
                neededcolor="9"
                startfillcolor="white"
                startstrokecolor="white"
              >
                <path
                  d="M207.865,657.516h208.509L312.119,543.16L207.865,657.516z"
                ></path>
              </g>
              <g stoppainting="true" id="kontyr">
                <path
                  fill="#CCA452"
                  d="M705.002,825"
                ></path>
              </g>
            </svg>
          </div>

          <!-- class="coloringBook_2_pencilsWrapper" - обязателен на блоке, используется в js -->

          <div class="coloringBook_2_pencilsWrapper"></div>
        </div>
      </div> */

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "coloringBook_2_task-1";
  //массив карандашей, в поле imgSrc указывается путь к изображению карандаша,
  // в поле colorName - hex - цвет карандаша
  const pencils = [
    {
      id: 1,
      colorName: "#D83639",
      imgSrc: "Images_1/coloringBook_2/red-D83639.png",
    },
  ];

  // указывается расшифровка номеров цветов из атрибутов neededcolor (из поля colorName  массива pencils)
  const rightAnswers = {
    9: "#FFFF99",
    10: "#50AC6D",
  };

  //сама функция, здесь ничего менять не нужно
  createСoloringBook_2_Markup(pencils, taskId, rightAnswers);
})();
