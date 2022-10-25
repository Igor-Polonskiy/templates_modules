import { createColoringBook_1_Markup } from "../utcf/individual_files/individual_scripts/createColoringBook_1_Markup.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="coloringBook_1_task-1">
        <div class="coloringBook_1_coloringsWrapper">
          <!-- class="coloringBook_1_coloringImageWrapper" - обязателен на блоке, используется в js -->
          <div class="coloringBook_1_coloringImageWrapper">
            <!-- сюда вставляется svg-картинка раскраски -->
            <!-- у svg class="coloringBook_1_coloringImage" - обязателен, используется в js -->
            <!-- атрибут stoppainting="true" ставится у тех частей g svg, которые не должны закрашиваться -->
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
              class="coloringBook_1_coloringImage"
            >
              <g
                stroke-width="2"
                stroke="white"
                fill="white"
                startfillcolor="white"
                startstrokecolor="white"
              >
                <path
                  d="M946.344"
                ></path>
              </g>
              <g id="kontur" stoppainting="true">
                <path
                  fill="#343434"
                  d="M914.492,627"
                ></path>
              </g>
            </svg>
          </div>

          <!-- class="coloringBook_1_pencilsWrapper" - обязателен на блоке, используется в js -->

          <div class="coloringBook_1_pencilsWrapper"></div>
        </div>
      </div> */

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "coloringBook_1_task-1";
  //массив карандашей, в поле imgSrc указывается путь к изображению карандаша,
  // в поле colorName - hex - цвет карандаша
  const pencils = [
    {
      id: 1,
      colorName: "#FFFFFF",
      imgSrc: "Images_1/coloringBook_1/pencils_white.svg",
    },
  ];

  //сама функция, здесь ничего менять не нужно
  createColoringBook_1_Markup(pencils, taskId);
})();
