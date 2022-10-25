import { renderLetterTracing } from "../utcf/individual_files/individual_scripts/renderLetterTracing.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="letterTracing_task-1">
        <div class="letterTracing_letter_wrapper">
          <div class="letterTracing_letter_img">
            <canvas class="letterTracing_letter_canvas"></canvas>
            <!--вставляем нужную картинку-->
            <img
              class="letterTracing_letter_picture"
              src="Images_1/letterTraicing/apple.png"
            />
          </div>

          <!--вставляем нужный аудиофайл-->
          <audio
            class="letterTracing_letter_audio"
            src="sound/letterTraicing/A.mp3"
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
      </div>
 */

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "letterTracing_task-1";

  /*заменить Aa на нужные буквы*/
  const letter = "Aa";
  /*при необходимости подобрать подходящее занчение winPercent (0.75 - 0.85)
    для проверки заполненности буквы*/
  const winPercent = 0.8;
  /**/
  /*при необходимости подобрать нужный шрифт, скачать и подключить в css*/
  const font = "Titillium Web";

  /*заменить цвет закраски буквы на нужный в формате rgb*/
  /*использовать любой кроме
    (220,220,220)-цвет буквы и
    (240, 100, 0)-цвет обводки
    (значение 220 нельзя применять ни к одному из трех каналов цвета)*/

  const rgbValues = {
    r: 230,
    g: 0,
    b: 0,
  };

  /**/
  //сама функция, здесь ничего менять не нужно
  renderLetterTracing(taskId, letter, winPercent, font, rgbValues);
})();
