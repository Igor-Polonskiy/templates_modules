import { renderSlideShow_2_Markup } from "../utcf/individual_files/individual_scripts/renderSlideShow_2_Markup.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="slideShow_2_task_wrapper" id="slideShow_2_task-1">
        <div class="slideShow_2_task_begin">
          <div class="slideShow_2_task_start1 slideShow_2_task_start">
            начать со звуком
          </div>
          <div class="slideShow_2_task_start2 slideShow_2_task_start">
            начать без звука
          </div>
        </div>
        <div class="slideShow_2_task_sliderWrapper">
          <div class="slideShow_2_task_counting">
            Изображение
            <div class="slideShow_2_task_count1"></div>
            из
            <div class="slideShow_2_task_count2"></div>
          </div>

          <div class="slideShow_2_task_slider">
            <div class="gallery_arrow gallery_arrow_left"></div>
            <div class="slideShow_2_task_slides"></div>
            <div class="gallery_arrow gallery_arrow_right"></div>
          </div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "slideShow_2_task-1";
  // массив входящих данных(картинка, звук, текст)
  // количество слайдов любое
  // если данные для полей отсутствуют, то оставлять ''
  // поле id должны быть уникальными, т.к. по нему происходит воспроизведение звуков
  // если нужно, чтобы в поле text сам текст был не сплошной строкой, то в нужных местах в строке ставить тег <br>

  const sliderContent = [
    {
      id: 1,
      imgSrc: "Images_1/slideShow_2/task2-1.png",
      audioSrc: "sound/slideShow_2/assets_task2_audio_001.mp3",
      text: "Количественный счёт — это определение количества предметов. С помощью этого счёта можно ответить на вопрос «сколько?». Для этого нужно посчитать предметы. То число, которое назвали при счёте назвали последним, указывает на количество предметов.",
    },
  ];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderSlideShow_2_Markup(sliderContent, taskId);
})();
