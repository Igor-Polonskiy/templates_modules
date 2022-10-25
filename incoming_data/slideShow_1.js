import { renderSlideShow_1 } from "../utcf/individual_files/individual_scripts/renderSlideShow_1.js";

// вставить в html
/*
 <!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="slideShow_1_task-1">
        <div class="slideShow_1_ContentBox">
          <div class="gallery_arrow gallery_arrow_left"></div>
          <div class="slideShow_1_Content"></div>
          <div class="gallery_arrow gallery_arrow_right"></div>
        </div>
        <div class="slideShow_1_Content_sliderCounter">
          <div
            class="slideShow_1_Content_sliderCounter__actual slideShow_1_Counter-actual"
          ></div>
          /
          <div class="slideShow_1_Counter"></div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "slideShow_1_task-1";
  // массив входящих данных(картинка, звук, текст)
  // количество слайдов любое
  // поле text, audioSrc заполняются по необходимости,
  // если данные для полей отсутствуют, то оставлять ''
  // поле id должны быть уникальными, т.к. по ним происходит воспроизведение звуков
  // если звуки отсутствуют, то поле audioSrc также оставить пустым ''
  const sliderContent = [
    {
      id: 1,
      imgSrc: "Images_1/slideShow_1/DOH_3-4_25_2_13.png",
      audioSrc: "sound/slideShow_1/005.mp3",
      text: "Вы вошли в автобус с задней площадки и увидели, что у передней двери стоят ваши друзья. Надо ли поздороваться с ними, если надо, то как это сделать?",
    },
  ];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSlideShow_1(sliderContent, taskId);
})();
