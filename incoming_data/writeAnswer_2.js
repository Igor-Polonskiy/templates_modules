import { renderWriteAnswer_2_Markup } from "../utcf/individual_files/individual_scripts/renderWriteAnswer_2_Markup.js";

// вставить в html
/*
 <!-- в поле id(writeAnswer_2_task-1) указывается уникальный id для данного задания -->

      <!-- у select который участвует в получении ответа, обязательно должен быть класс "writeAnswer_2_task_select", по нему собирается правильность ответа -->
      <!-- у картинки обязательно должен быть класс writeAnswer_2_task_image, по нему происходит увеличение картинки -->
      <!-- у тега audio  обязательно должен быть класс "writeAnswer_2_task_audio", по нему собираются звуки -->
      <!-- id  у каждого тега audio должно совпадать с атрибутом audio-data у кнопки звука -->
      <!-- иконка звука верстается так, внутри есть тег аудио, поля заполняются согласно правилам выше: <div
              class="buttonPlayPausePlayPause_wrap buttonPlayPause--play"
              audio-data="1writeAnswer_2_task-1"
            >
              <div
                class="buttonPlayPause__shape buttonPlayPause__shape--one"
              ></div>
              <div
                class="buttonPlayPause__shape buttonPlayPause__shape--two"
              ></div>
              <audio
                id="1writeAnswer_2_task-1"
                class="writeAnswer_1_task_audio"
                src="sound/writeAnswer_1/sound_7_task7_1.mp3"
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div> -->
      <div class="writeAnswer_2_task_wrapper" id="writeAnswer_2_task-2">
        <!-- сюда вставляется изменяющийся контент -->

        <div class="writeAnswer_2_task_line">
          <div class="writeAnswer_2_task_answer">
            <div class="writeAnswer_2_task_answer_item">
              <div
                class="buttonPlayPausePlayPause_wrap buttonPlayPause--play"
                audio-data="1writeAnswer_2_task-2"
              >
                <div
                  class="buttonPlayPause__shape buttonPlayPause__shape--one"
                ></div>
                <div
                  class="buttonPlayPause__shape buttonPlayPause__shape--two"
                ></div>
                <audio
                  id="1writeAnswer_2_task-2"
                  class="writeAnswer_2_task_audio"
                  src="sound/3.mp3"
                >
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </div>
              <img
                class="writeAnswer_2_task_image"
                src="Images_1/task8_1.png"
              />
            </div>
            <div class="writeAnswer_2_task_answer_item">
              <select class="writeAnswer_2_task_select">
                <option value="0">...</option>
                <option value="1">&gt;</option>
                <option value="2">&lt;</option>
              </select>
            </div>
            <div class="writeAnswer_2_task_answer_item">
              <div
                class="buttonPlayPausePlayPause_wrap buttonPlayPause--play"
                audio-data="2writeAnswer_2_task-2"
              >
                <div
                  class="buttonPlayPause__shape buttonPlayPause__shape--one"
                ></div>
                <div
                  class="buttonPlayPause__shape buttonPlayPause__shape--two"
                ></div>
                <audio
                  id="2writeAnswer_2_task-2"
                  class="writeAnswer_2_task_audio"
                  src="sound/2.mp3"
                >
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </div>
              <img
                class="writeAnswer_2_task_image"
                src="Images_1/task8_2.png"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
*/
(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "writeAnswer_2_task-1";

  // массив с правильными ответами (value тега option) (или числа или строки), указываются в той же последовательности, что и селекты
  const rightAnswers = [1, 3, 3, 1, 3, 2];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderWriteAnswer_2_Markup(rightAnswers, taskId);
})();
