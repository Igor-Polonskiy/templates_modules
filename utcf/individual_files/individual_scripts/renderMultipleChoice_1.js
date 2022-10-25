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

export function renderMultipleChoice_1(data, taskId, rightAnswer) {
  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  let isGameStart = false;
  console.log(rightAnswer);

  const task = document.querySelector(`#${taskId}`);
  const field = task.querySelector(".multipleChoice_1_inputList");

  field.insertAdjacentHTML("beforeend", createPictureCardsMarkup([...data]));

  renderCheckPanel(task, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(task);

  const audioFiles = task.querySelectorAll(".multipleChoice_1_audio");

  let inputs = task.querySelectorAll(".multipleChoice_1_input");
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  field.addEventListener("click", onAudioIconClick);
  field.addEventListener("change", changeAnswer);

  btnTest.addEventListener("click", onCheckTaskBtnClick);
  btnReset.addEventListener("click", onReloadBtnClick);

  function createPictureCardsMarkup(data) {
    return data
      .map((item) => {
        const isAudio =
          item.audioSrc &&
          `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play multipleChoice_1_audio_image" ${soundDataAttribute}="${item.id}${taskId}">
                            <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                            <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                            <audio class="multipleChoice_1_audio" id="${item.id}${taskId}" src="${item.audioSrc}">
                                  Your browser does not support the <code>audio</code> element.
                                </audio>
                          </div>`;

        return `<div class="multipleChoice_1_inputWrapper ">
                      <input class="multipleChoice_1_input" type="checkbox" value="${item.text}" name ="${taskId}" id="${item.id}${taskId}"
                      data-answer ="${item.answerTag}"/>
                      ${isAudio}
                      <label for="${item.id}${taskId}">${item.text}</label>
                    </div>
                      `;
      })
      .join("");
  }

  function changeAnswer(e) {
    if (e.target.classList.contains("multipleChoice_1_input")) {
      if (!isGameStart) {
        // открываем кнопку ПРОВЕРИТЬ
        toggleOpacityAndEventsElement(btnTest);
        isGameStart = true;
      }

      const isCheckedInput = [...inputs].some((item) => {
        return item.checked;
      });

      if (!isCheckedInput) {
        // закрываем кнопку ПРОВЕРИТЬ
        isGameStart = false;
        toggleOpacityAndEventsElement(btnTest);
      }
    }
  }
  function onAudioIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function onCheckTaskBtnClick(e) {
    resetSound(soundSetStates);
    let winvar = 0;
    let answer = 0;

    inputs.forEach((item) => {
      if (item.getAttribute("data-answer") === rightAnswer) {
        answer++;
      }
      if (item.checked) {
        if (item.getAttribute("data-answer") === rightAnswer) {
          winvar++;
        } else winvar--;
      }
    });

    if (answer === winvar) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    if (!field.classList.contains("noEventElement")) {
      togglePointerEventElement(field);
    }
  }

  function onReloadBtnClick() {
    resetSound(soundSetStates);

    inputs.forEach((item) => {
      item.checked = 0;
    });

    checkingAnswerReset(controlsBox, infoBox);
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
