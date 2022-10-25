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

export function renderWriteAnswer_2_Markup(rightAnswers, taskId) {
  const soundDataAttribute = "audio-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  let isGameStart = false;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const allSelects = taskWrapper.querySelectorAll(".writeAnswer_2_task_select");
  const audioFiles = taskWrapper.querySelectorAll(".writeAnswer_2_task_audio");

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  btnReset.addEventListener("click", onReloadBtnClick);
  btnTest.addEventListener("click", onCheckTaskBtnClick);
  taskWrapper.addEventListener("pointerdown", onAnswerClick);
  taskWrapper.addEventListener("change", onInputChange);

  function onInputChange(e) {
    if (e.target.classList.contains("writeAnswer_2_task_select")) {
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
    if (e.target.classList.contains("writeAnswer_2_task_image")) {
      scaleImage(e.target);
    }
  }

  function onReloadBtnClick() {
    [...allSelects].forEach((el) => {
      el.value = 0;
      removeActiveCardClass(el);
    });

    [...taskWrapper.children].forEach((el, index) => {
      if (index !== taskWrapper.children.length - 1) {
        if (el.classList.contains("noEventElement"))
          togglePointerEventElement(el);
      }
    });
    resetSound(soundSetStates);
    checkingAnswerReset(controlsBox, infoBox);
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onCheckTaskBtnClick() {
    let winCount = 0;
    [...allSelects].forEach((el, index) => {
      if (el.value === String(rightAnswers[index]).toLowerCase()) {
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
    [...taskWrapper.children].forEach((el, index) => {
      if (
        index !== taskWrapper.children.length - 1 &&
        !el.classList.contains("noEventElement")
      ) {
        togglePointerEventElement(el);
      }
    });
  }
}
