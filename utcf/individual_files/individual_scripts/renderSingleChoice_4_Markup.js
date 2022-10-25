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

export function renderSingleChoice_4_Markup(
  arrayOfElements,
  rightAnswer,
  taskId
) {
  let currentActiveCard;
  let isGameStart = false;

  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const arrayLength = arrayOfElements.length;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const listContainer = taskWrapper.querySelector(".singleChoice_4_List");

  listContainer.insertAdjacentHTML(
    "beforeend",
    createCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  const audioFiles = document.querySelectorAll(`.singleChoice_4_audio`);

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  listContainer.addEventListener("click", onListItemClick);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function onBtnResetClick(e) {
    [...listContainer.children].forEach((el) => {
      getRandomPositionToCard(el);
      removeActiveCardClass(el);
    });

    listContainer.addEventListener("click", onListItemClick);

    resetSound(soundSetStates);

    checkingAnswerReset(controlsBox, infoBox);
    currentActiveCard = null;
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick(e) {
    if (!currentActiveCard) {
      return;
    }

    if (currentActiveCard && currentActiveCard.dataset.name === rightAnswer) {
      addRightChoiceClass(currentActiveCard);
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      addWrongChoiceClass(currentActiveCard);
      checkingAnswerNegative(controlsBox, infoBox);
    }

    resetSound(soundSetStates);

    listContainer.removeEventListener("click", onListItemClick);
  }

  function createCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        let widthItem;
        if (picture.text) {
          if (arrayLength > 4) {
            widthItem = `"width: calc(100% / 3 - 10px)"`;
          } else if (arrayLength < 4) {
            widthItem = `"width: calc(100% / ${arrayLength} - 10px)"`;
          } else if (arrayLength === 4) {
            widthItem = `"width: calc(100% / 2 - 10px)"`;
          }
        } else widthItem = `"width: calc(100% / ${arrayLength} - 10px)"`;

        const isTitle =
          picture.text &&
          `<div class='singleChoice_4_Title'>${picture.text}</div>`;

        return `
                  <div class="singleChoice_4_Item oneMultiChoice_border" data-name="${picture.answerTag}" style=${widthItem}>
                  <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${picture.id}${taskId}">
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                      <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                        <audio class="singleChoice_4_audio" id="${picture.id}${taskId}" src="${picture.audioSrc}">Your browser does not support the <code>audio</code> element.
                       </audio>
                  </div>
                  ${isTitle}
                  </div>
                  `;
      })
      .join("");
  }

  function onListItemClick(e) {
    let imgEl;
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
    const isImgEl =
      e.target.classList.contains("singleChoice_4_Title") ||
      e.target.classList.contains("singleChoice_4_Item");

    if (!isImgEl) {
      return;
    }

    if (e.target.classList.contains("singleChoice_4_Title")) {
      imgEl = e.target.parentElement;
    } else imgEl = e.target;

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }

    if (imgEl.classList.contains("targetChoice_color")) {
      removeActiveCardClass(imgEl);
      // закрываем кнопку ПРОВЕРИТЬ
      isGameStart = false;
      toggleOpacityAndEventsElement(btnTest);
    } else if (imgEl.classList.contains("singleChoice_4_Item")) {
      currentActiveCard && removeActiveCardClass(currentActiveCard);

      addCheckClass(imgEl);
      currentActiveCard = imgEl;
    }
  }
}
