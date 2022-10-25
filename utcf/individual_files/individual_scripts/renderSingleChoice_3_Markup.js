import {
  scaleImage,
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

export function renderSingleChoice_3_Markup(
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
  const listContainer = taskWrapper.querySelector(".singleChoice_3_List");

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  listContainer.addEventListener("pointerdown", onListItemClick);

  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  const audioFiles = taskWrapper.querySelectorAll(".singleChoice_3_audio");

  function onBtnResetClick(e) {
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }

    currentActiveCard && removeActiveCardClass(currentActiveCard);

    [...listContainer.children].forEach((el) => getRandomPositionToCard(el));

    resetSound(soundSetStates);
    checkingAnswerReset(controlsBox, infoBox);
    currentActiveCard = null;

    listContainer.addEventListener("pointerdown", onListItemClick);
  }

  function onBtnTestClick(e) {
    if (currentActiveCard && currentActiveCard.dataset.name === rightAnswer) {
      addRightChoiceClass(currentActiveCard);
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      addWrongChoiceClass(currentActiveCard);
      checkingAnswerNegative(controlsBox, infoBox);
    }

    resetSound(soundSetStates);

    listContainer.removeEventListener("pointerdown", onListItemClick);
  }

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        let widthItem;
        if (arrayLength > 4) {
          widthItem = `"width: calc(100% / 3 - 10px)"`;
        } else if (arrayLength < 4) {
          widthItem = `"width: calc(100% / ${arrayLength} - 10px)"`;
        } else if (arrayLength === 4) {
          widthItem = `"width: calc(100% / 2 - 10px)"`;
        }
        const isTitle =
          picture.text &&
          `<div class='singleChoice_3_Title'>${picture.text}</div>`;
        const isSound =
          picture.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="singleChoice_3_audio" id="${picture.id}${taskId}" src="${picture.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `
                <div class="singleChoice_3_Item oneMultiChoice_border" data-name="${picture.answerTag}" style=${widthItem}>
                    <div class='singleChoice_3_ImageBox' style="background-image: url(${picture.imgSrc})">
                       <div class="zoom_open_button_white singleChoice_3_enlarge_picture" title="Увеличить изображение">
                          <div class="icon_zoomPicture whiteZoomImg"></div>
                       </div>
                    </div>
                    ${isSound}
                    ${isTitle}
                    </div>
                    `;
      })
      .join("");
  }

  function onListItemClick(e) {
    let imgEl;
    if (e.target.classList.contains("singleChoice_3_enlarge_picture")) {
      scaleImage(e.target.parentElement);
    }
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
    const isImgEl =
      e.target.classList.contains("singleChoice_3_ImageBox") ||
      e.target.classList.contains("singleChoice_3_Title") ||
      e.target.classList.contains("singleChoice_3_Item");

    if (!isImgEl) {
      return;
    }

    if (
      e.target.classList.contains("singleChoice_3_ImageBox") ||
      e.target.classList.contains("singleChoice_3_Title")
    ) {
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
    } else if (imgEl.classList.contains("singleChoice_3_Item")) {
      currentActiveCard && removeActiveCardClass(currentActiveCard);
      addCheckClass(imgEl);
      currentActiveCard = imgEl;
    }
  }
}
