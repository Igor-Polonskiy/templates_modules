import { renderWriteAnswer_1_Markup } from "../utcf/individual_files/individual_scripts/renderWriteAnswer_1_Markup.js";

// вставить в html
/*
      <!-- в поле id (id="writeAnswer_1_task-1") указывается уникальный id для данного задания -->
      <!-- Каждому значку звука и соответствующему ему тегу audio присваиваиваются уникальные для этой пары data-атрибут audio-data и id соответственно, по которому и будет происходить воспроизведение звуков -->
      <!-- у инпута который участвует в получении ответа, обязательно должен быть класс "writeAnswer_1_task_input", по нему собирается правильность ответа -->
      <!-- у тега audio  обязательно должен быть класс "writeAnswer_1_task_audio", по нему собираются звуки -->
      <!-- если input предусматривает числа, то type="number", если текст то type="text" -->
      <!-- чтобы ограничить выбор отрицательных значений дописывается min='0' -->
      <!-- у картинки обязательно должен быть класс writeAnswer_1_task_image, по нему происходит увеличение картинки -->
      <!-- иконка звука верстается так, внутри есть тег аудио, поля заполняются согласно правилам выше: <div
              class="buttonPlayPausePlayPause_wrap buttonPlayPause--play"
              audio-data="1writeAnswer_1_task-1"
            >
              <div
                class="buttonPlayPause__shape buttonPlayPause__shape--one"
              ></div>
              <div
                class="buttonPlayPause__shape buttonPlayPause__shape--two"
              ></div>
              <audio
                id="1writeAnswer_1_task-1"
                class="writeAnswer_1_task_audio"
                src="sound/writeAnswer_1/sound_7_task7_1.mp3"
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div> -->

      <div class="writeAnswer_1_task_wrapper" id="writeAnswer_1_task-1">
        <div class="writeAnswer_1_task_answer">
          <!-- сюда вставляется изменяющийся контент -->

          <div>
            <div
              class="buttonPlayPausePlayPause_wrap buttonPlayPause--play"
              audio-data="1writeAnswer_1_task-1"
            >
              <div
                class="buttonPlayPause__shape buttonPlayPause__shape--one"
              ></div>
              <div
                class="buttonPlayPause__shape buttonPlayPause__shape--two"
              ></div>
              <audio
                id="1writeAnswer_1_task-1"
                class="writeAnswer_1_task_audio"
                src="sound/writeAnswer_1/sound_7_task7_1.mp3"
                audio-data="1writeAnswer_1_task-1"
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>
            <p>
              Сколько шей у пяти журавлей?
              <input class="writeAnswer_1_task_input" min="0" type="number" />
            </p>
          </div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "writeAnswer_1_task-2";

  // массив с правильными ответами (или числа или строки), указываются в той же последовательности, что и инпуты
  const rightAnswers = ["8", "4", "7", "5", "6", "10", "10", "КОЛИБРИ"];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderWriteAnswer_1_Markup(rightAnswers, taskId);
})();
