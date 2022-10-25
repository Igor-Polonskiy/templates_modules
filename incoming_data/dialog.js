import { renderDirectDialogue } from "../utcf/individual_files/individual_scripts/renderDirectDialogue.js";

// вставить в html
/*
<!-- в поле id указывается уникальный id для данного задания -->
      <div class="trainerTaskWrapper" id="directDialogue_1_task-1">
        <div class="directDialogue_1_dialog">
          <div class="directDialogue_1_dialog_blure1">
            <div class="directDialogue_1_dialog_start">Start</div>
          </div>
          <div class="directDialogue_1_dialog_wrapper">
            <div class="directDialogue_1_dialog_interviewer">
              <!--вставляем картинку с персонажем-->
              <img
                class="directDialogue_1_dialog_interviewer_image"
                src="Images_1/dialog/coco.svg"
                alt="parrot"
              />
            </div>
            <div class="directDialogue_1_dialog_text_wrapper">
              <div class="directDialogue_1_dialog_text"></div>
            </div>
          </div>
          <div class="directDialogue_1_dialog_answers"></div>
        </div>
      </div>
*/

(() => {
  // это уникальный id для данного задания, который был присвоен в html
  const taskId = "directDialogue_1_task-1";
  /*массив с фразами попугая*/
  // audioSrc -  заполняется, если нужна озвучка фраз, если озвучки нет, то ставится ''
  const opponentWords = [
    {
      id: 1,
      text: "Hello!",
      audioSrc: "sound/hello.mp3",
    },
  ];

  /*массив с массивом фраз для ответа, первый массив - ответы на первую фразу попугая и т.д.*/
  // id - должно быть уникально во всем массиве (нумерация сверху вниз по порядку)
  const studentAnswers = [
    [
      {
        id: 1,
        text: "Hi!",
        audioSrc: "sound/hi.mp3",
      },
    ],
    [
      {
        id: 4,
        text: "Great! And you?",
        audioSrc: "sound/great-and-you.mp3",
      },
    ],
  ];

  // сама функция, которая запускается, здесь ничего менять не нужно
  renderDirectDialogue(taskId, opponentWords, studentAnswers);
})();
