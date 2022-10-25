import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  onSoundIconClick,
  resetSound,
  togglePointerEventElement,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderSingleChoice_1(data, taskId, rightAnswer) {
  let answer;
  let isGameStart = false;

  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const task = document.querySelector(`#${taskId}`);
  const field = task.querySelector(".singleChoice_1_inputList");

  field.insertAdjacentHTML("beforeend", cardsMarkup(data));
  renderCheckPanel(task, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(task);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  let inputs = task.querySelectorAll(".singleChoice_1-input");
  const audioFiles = task.querySelectorAll(".singleChoice_1-audio");

  inputs.forEach((item) => {
    item.addEventListener("change", changeAnswer);
  });

  field.addEventListener("click", onAudioIconClick);
  btnTest.addEventListener("click", onCheckTaskBtnClick);
  btnReset.addEventListener("click", onReloadBtnClick);

  function onAudioIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function cardsMarkup(items) {
    return items
      .map((item) => {
        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="singleChoice_1-audio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `<div class="singleChoice_1_inputWrapper">
        <input class="singleChoice_1-input" type="radio" value="${item.text}" name="${taskId}" id="${item.id}${taskId}">
        ${isSound}
        <label for="${item.id}${taskId}">${item.text}</label>
        </div>`;
      })
      .join("");
  }

  function changeAnswer(e) {
    answer = e.target.value;
    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }
  }

  function onCheckTaskBtnClick() {
    if (answer === rightAnswer) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }

    resetSound(soundSetStates);

    togglePointerEventElement(field);
  }

  function onReloadBtnClick() {
    inputs.forEach((item) => {
      item.checked = 0;
    });
    answer = null;

    checkingAnswerReset(controlsBox, infoBox);

    resetSound(soundSetStates);
    if (field.classList.contains("noEventElement")) {
      togglePointerEventElement(field);
    }
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }
}
