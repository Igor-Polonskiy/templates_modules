import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerReset,
  onSoundIconClick,
  resetSound,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function renderDirectDialogue(taskId, opponentWords, studentAnswers) {
  let stage = 0;
  const studentAnswersLength = studentAnswers.length;

  const dropId = "drop";
  const dragId = "drag";
  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const createNewIdDropArr = opponentWords.map((el) => {
    return {
      ...el,
      id: `${dropId}_${el.id}${taskId}`,
    };
  });

  const createNewIdDragArr = studentAnswers.flat(1).map((el) => {
    return {
      ...el,
      id: `${dragId}_${el.id}${taskId}`,
    };
  });

  const audioArray = [...createNewIdDropArr, ...createNewIdDragArr];

  const taskWrapper = document.querySelector(`#${taskId}`);
  const dialog = taskWrapper.querySelector(".directDialogue_1_dialog_text");
  const answers = taskWrapper.querySelector(".directDialogue_1_dialog_answers");
  const dialog_blure = taskWrapper.querySelector(
    ".directDialogue_1_dialog_blure1"
  );

  const startbtn = taskWrapper.querySelector(".directDialogue_1_dialog_start");

  taskWrapper.insertAdjacentHTML("beforeend", createAudioTagMarkup(audioArray));

  renderCheckPanel(taskWrapper, false);
  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(taskWrapper);

  const audioFiles = taskWrapper.querySelectorAll(".directDialogue_1_audio");

  startbtn.addEventListener("click", start);
  btnReset.addEventListener("click", resetTask);
  // taskWrapper.addEventListener("click", onTaskElementsClick);
  taskWrapper.addEventListener("pointerdown", onTaskElementsClick);

  function start() {
    dialog_blure.style.display = "none";

    let phrase = createQuestionsMarkup(opponentWords[stage]);
    dialog.append(phrase);

    setTimeout(() => {
      phrase.style.left = 0;
      createAnswersListMarkup(studentAnswers[stage], answers);
    }, 100);
  }

  function onTaskElementsClick(e) {
    if (
      e.target.classList.contains("directDialogue_1_dialog_interviewer_image")
    ) {
      scaleImage(e.target);
    }

    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
      return;
    }

    if (e.target.closest(".directDialogue_1_dialog_answer")) {
      let phrase;

      if (e.target.classList.contains("directDialogue_1_dialog_answer-text")) {
        phrase = createOneAnswerMarkup(e.target.parentElement, dialog);
      } else phrase = createOneAnswerMarkup(e.target, dialog);

      setTimeout(() => (phrase.style.right = 0), 10);
      stage++;
      answers.innerHTML = "";

      if (stage <= studentAnswersLength - 1) {
        let phrase1 = createQuestionsMarkup(opponentWords[stage]);
        setTimeout(() => dialog.append(phrase1), 1000);

        setTimeout(() => {
          phrase1.style.left = 0;
          createAnswersListMarkup(studentAnswers[stage], answers);
        }, 1100);
      }

      if (stage === studentAnswersLength) {
        setTimeout(
          () => {
            togglePointerEventElement(taskWrapper.firstElementChild);
            checkingAnswerPositive(controlsBox, infoBox);
          },

          1500
        );
      }
    }
  }

  function createAnswersListMarkup(items, place) {
    items.forEach((item) => {
      let answer = document.createElement("div");
      answer.classList.add("directDialogue_1_dialog_answer");
      if (item.audioSrc) {
        answer.dataset.id = `${dragId}_${item.id}${taskId}`;
      }
      const isSound =
        item.audioSrc &&
        `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                </div>`;
      answer.innerHTML = `
      ${isSound}
    <div class="directDialogue_1_dialog_answer-text" >${item.text}</div>`;

      place.append(answer);
    });
  }

  function createQuestionsMarkup(item) {
    let phrase = document.createElement("div");
    phrase.classList.add("directDialogue_1_dialog_Interviewer");
    const isSound =
      item.audioSrc &&
      `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                </div>`;
    phrase.innerHTML = `${isSound}
                <div>${item.text}</div>`;
    return phrase;
  }

  function createOneAnswerMarkup(item, place) {
    let phrase = document.createElement("div");
    phrase.classList.add("directDialogue_1_dialog_User");

    const isSound = item.dataset.id
      ? `<div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.dataset.id}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                </div>`
      : "";
    phrase.innerHTML = `${isSound}
    <div>${item.innerText}</div>`;
    place.append(phrase);
    return phrase;
  }

  function createAudioTagMarkup(items) {
    return items
      .map((item, index) => {
        return `
      <audio class="directDialogue_1_audio" id="${item.id}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
      `;
      })
      .join("");
  }

  function resetTask() {
    dialog.innerHTML = "";
    answers.innerHTML = "";
    stage = 0;
    dialog_blure.style.display = "flex";
    checkingAnswerReset(controlsBox, infoBox);
    resetSound(soundSetStates);
    if (taskWrapper.firstElementChild.classList.contains("noEventElement")) {
      togglePointerEventElement(taskWrapper.firstElementChild);
    }
  }
}
