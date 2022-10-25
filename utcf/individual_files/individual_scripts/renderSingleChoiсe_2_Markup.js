import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  onSoundIconClick,
  resetSound,
  getRandomPositionToCard,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderSingleChoiсe_2_Markup(answersData, winVarTask, taskId) {
  let finishAnswer = null;

  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  let isGameStart = false;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const answers = taskWrapper.querySelector(".singleChoiсe_2_task_answers");

  createMarcup();
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  const audioFiles = taskWrapper.querySelectorAll(".singleChoiсe_2_audio");

  answers.addEventListener("click", onAnswerClick);
  btnReset.addEventListener("click", onReloadBtnClick);
  btnTest.addEventListener("click", onCheckTaskBtnClick);

  function createMarcup() {
    answers.insertAdjacentHTML(
      "beforeend",
      insertAnswers(shuffleCards([...answersData]))
    );
  }

  function onAnswerClick(e) {
    if (e.target.classList.contains("singleChoiсe_2_task_answer")) {
      if (!isGameStart) {
        // открываем кнопку ПРОВЕРИТЬ
        toggleOpacityAndEventsElement(btnTest);
        isGameStart = true;
      }
      if (e.target.classList.contains("targetChoice_color")) {
        removeActiveCardClass(e.target);

        // закрываем кнопку ПРОВЕРИТЬ
        isGameStart = false;
        toggleOpacityAndEventsElement(btnTest);
        finishAnswer = null;
      } else {
        if (finishAnswer) {
          removeActiveCardClass(finishAnswer);
        }

        addCheckClass(e.target);
        finishAnswer = e.target;
      }
    }
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function insertAnswers(arr) {
    const widthText = arr.some((el) => el.text.length > 6);
    if (!widthText && arr.length > 5) {
      answers.classList.add("singleChoiсe_2_task_answers_width");
    }
    return arr
      .map((item) => {
        let elementWidth;
        let elWidthSmall = "";

        if (widthText) {
          if (arr.length > 4) {
            elementWidth = `"width: calc(100% / 3 - 10px)"`;
          } else if (arr.length < 4) {
            elementWidth = `"width: calc(100% / ${arr.length} - 10px)"`;
          } else if (arr.length === 4) {
            elementWidth = `"width: calc(100% / 2 - 10px)"`;
          }
        } else {
          elWidthSmall = [
            "singleChoiсe_2_task_answer_width",
            "singleChoiсe_2_task_answer_height",
          ].join(" ");
          elementWidth = "";
        }

        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="singleChoiсe_2_audio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `
                  <div class="singleChoiсe_2_task_answer ${elWidthSmall} oneMultiChoice_border" style=${elementWidth}>
                  ${isSound}
                  ${item.text}
                  </div>
              `;
      })
      .join("");
  }

  function onReloadBtnClick() {
    if (finishAnswer) {
      removeActiveCardClass(finishAnswer);
    }

    checkingAnswerReset(controlsBox, infoBox);
    finishAnswer = null;

    resetSound(soundSetStates);

    [...answers.children].forEach((el) => getRandomPositionToCard(el));

    answers.addEventListener("click", onAnswerClick);
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onCheckTaskBtnClick() {
    if (!finishAnswer) {
      return;
    }

    removeActiveCardClass(finishAnswer);
    if (finishAnswer.innerText === winVarTask) {
      addRightChoiceClass(finishAnswer);

      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      if (finishAnswer) {
        addWrongChoiceClass(finishAnswer);

        checkingAnswerNegative(controlsBox, infoBox);
      }
    }

    resetSound(soundSetStates);
    answers.removeEventListener("click", onAnswerClick);
  }
}
