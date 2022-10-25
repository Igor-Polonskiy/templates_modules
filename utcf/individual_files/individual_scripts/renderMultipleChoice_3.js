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

export function renderMultipleChoice_3(arrayOfElements, rightAnswer, taskId) {
  const soundDataAttribute = "sound-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  let isGameStart = false;

  const arrayLength = arrayOfElements.length;
  const rightAnswersLength = arrayOfElements.filter(
    (el) => el.answerTag === rightAnswer
  ).length;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const listContainer = taskWrapper.querySelector(".multipleChoice_3_List");

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  listContainer.addEventListener("pointerdown", matchingHandler);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  const audioFiles = taskWrapper.querySelectorAll(".multipleChoice_3-audio");

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((item) => {
        let widthItem;
        let heightItem;
        if (arrayLength > 10) {
          widthItem = `"width: calc(100% / 5 - 10px)"`;
          heightItem = "multipleChoice_3_Card_small";
        } else if (arrayLength > 8 && arrayLength <= 10) {
          widthItem = `"width: calc(100% / 5 - 20px)"`;
          heightItem = "multipleChoice_3_Card_middle";
        } else if (arrayLength > 6 && arrayLength <= 8) {
          widthItem = `"width: calc(100% / 4 - 20px)"`;
          heightItem = "multipleChoice_3_Card_middle";
        } else if (arrayLength > 4 && arrayLength <= 6) {
          widthItem = `"width: calc(100% / 3 - 20px)"`;
          heightItem = "multipleChoice_3_Card_middle";
        } else if (arrayLength === 4) {
          widthItem = `"width: calc(100% / 2 - 10px)"`;
          heightItem = "multipleChoice_3_Card_big";
        }

        const isTitle =
          item.text && `<div class='multipleChoice_3_Title'>${item.text}</div>`;

        const isSound =
          item.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${item.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="multipleChoice_3-audio" id="${item.id}${taskId}" src="${item.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `<div class="multipleChoice_3_Card oneMultiChoice_border" data="${item.answerTag}" style=${widthItem}>
                  <div class='multipleChoice_3_ImageBox ${heightItem}' style="background-image: url(${item.imgSrc})">
                      <div class="zoom_open_button_white multipleChoice_3-enlarge_picture" title="Увеличить изображение">
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

  function onBtnResetClick() {
    [...listContainer.children].forEach((item) => {
      removeActiveCardClass(item);
      getRandomPositionToCard(item);
    });
    checkingAnswerReset(controlsBox, infoBox);

    resetSound(soundSetStates);

    listContainer.addEventListener("pointerdown", matchingHandler);
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    let winCount = 0;

    const selectedItems = [...listContainer.children].filter((el) =>
      el.classList.contains("targetChoice_color")
    );

    selectedItems.forEach((item) => {
      if (item.attributes.getNamedItem("data").value === rightAnswer) {
        winCount += 1;
        addRightChoiceClass(item);
      } else {
        winCount -= 1;
        addWrongChoiceClass(item);
      }
    });
    if (winCount === rightAnswersLength) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else checkingAnswerNegative(controlsBox, infoBox);

    resetSound(soundSetStates);

    listContainer.removeEventListener("pointerdown", matchingHandler);
  }

  function matchingHandler(e) {
    let matchedItem;
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
    if (e.target.classList.contains("multipleChoice_3-enlarge_picture")) {
      scaleImage(e.target.parentElement);
    }
    const isImgEl =
      e.target.classList.contains("multipleChoice_3_Card") ||
      e.target.classList.contains("multipleChoice_3_Title") ||
      e.target.classList.contains("multipleChoice_3_ImageBox");

    if (!isImgEl) {
      return;
    }

    if (
      e.target.classList.contains("multipleChoice_3_ImageBox") ||
      e.target.classList.contains("multipleChoice_3_Title")
    ) {
      matchedItem = e.target.parentElement;
    } else matchedItem = e.target;

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }

    if (matchedItem.classList.contains("targetChoice_color")) {
      removeActiveCardClass(matchedItem);
    } else {
      addCheckClass(matchedItem);
    }
    const isSelectedItems = [...listContainer.children].some((el) =>
      el.classList.contains("targetChoice_color")
    );
    if (!isSelectedItems) {
      // закрываем кнопку ПРОВЕРИТЬ
      isGameStart = false;
      toggleOpacityAndEventsElement(btnTest);
    }
  }
}
