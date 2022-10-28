import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  onSoundIconClick,
  resetSound,
  togglePointerEventElement,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderWriteAnswer_1_Markup(rightAnswers, taskId) {
  const soundDataAttribute = "audio-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  let isGameStart = false;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const answersBox = taskWrapper.querySelector(".writeAnswer_1_task_answer");

  const allInputs = taskWrapper.querySelectorAll(".writeAnswer_1_task_input");
  const allInputsTask = taskWrapper.querySelectorAll("input");
  const audioFiles = taskWrapper.querySelectorAll(".writeAnswer_1_task_audio");

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  btnReset.addEventListener("click", onReloadBtnClick);
  btnTest.addEventListener("click", onCheckTaskBtnClick);
  answersBox.addEventListener("pointerdown", onAnswerClick);
  answersBox.addEventListener("change", onInputChange);

  function onInputChange(e) {
    if (e.target.tagName === "INPUT") {
      // открываем кнопку ПРОВЕРИТЬ
      if (!isGameStart) {
        toggleOpacityAndEventsElement(btnTest);
        isGameStart = true;
      }
    }
  }
  function onAnswerClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
    if (e.target.classList.contains("writeAnswer_1_task_image")) {
      scaleImage(e.target);
    }
  }

  function onReloadBtnClick() {
    [...allInputsTask].forEach((el) => {
      removeActiveCardClass(el);
      el.value = "";
    });
    resetSound(soundSetStates);
    checkingAnswerReset(controlsBox, infoBox);
    if (answersBox.classList.contains("noEventElement")) {
      togglePointerEventElement(answersBox);
    }
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onCheckTaskBtnClick() {
    let winCount = 0;
    [...allInputs].forEach((el, index) => {
      if (
        el.value.toLowerCase().trim() ===
        String(rightAnswers[index]).toLowerCase()
      ) {
        winCount += 1;
        addRightChoiceClass(el);
      } else addWrongChoiceClass(el);
    });
    if (winCount === rightAnswers.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    resetSound(soundSetStates);
    if (!answersBox.classList.contains("noEventElement")) {
      togglePointerEventElement(answersBox);
    }
  }
}
