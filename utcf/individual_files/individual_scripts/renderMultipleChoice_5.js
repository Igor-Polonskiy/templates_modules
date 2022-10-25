import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  shuffleCards,
  getRandomPositionToCard,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function renderMultipleChoice_5(arrayOfElements, rightAnswer, taskId) {
  let isGameStart = false;

  const arrayLength = arrayOfElements.length;
  const rightAnswersLength = arrayOfElements.filter(
    (el) => el.answerTag === rightAnswer
  ).length;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const listContainer = taskWrapper.querySelector(
    ".multipleChoice_5_VideoList"
  );

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  listContainer.addEventListener("click", matchingHandler);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((item) => {
        let heightItem;

        if (arrayLength === 4) {
          heightItem = "multipleChoice_5_VideoCard_big";
        } else {
          heightItem = "multipleChoice_5_VideoCard_middle";
        }
        const isTitle =
          item.text &&
          `<div class='multipleChoice_5_VideoTitle'>${item.text}</div>`;

        return `<div class="multipleChoice_5_VideoCard oneMultiChoice_border ${heightItem}" data="${item.answerTag}" >
                    <video class="multipleChoice_5_Video " controls
                           src="${item.videoSrc}"
                           id="${item.id}${taskId}"
                           type="video/mp4"
                    >
                    </video>
                    ${isTitle}
                </div>`;
      })
      .join("");
  }

  function onBtnResetClick() {
    checkingAnswerReset(controlsBox, infoBox);
    [...listContainer.children].forEach((item) => {
      removeActiveCardClass(item);
      getRandomPositionToCard(item);
      item.firstElementChild.pause();
      item.firstElementChild.currentTime = 0;
      if (item.firstElementChild.classList.contains("noEventElement")) {
        togglePointerEventElement(item.firstElementChild);
      }
    });

    listContainer.addEventListener("click", matchingHandler);
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

    [...listContainer.children].forEach((el) => {
      el.firstElementChild.pause();
      if (!el.firstElementChild.classList.contains("noEventElement")) {
        togglePointerEventElement(el.firstElementChild);
      }
    });
    listContainer.removeEventListener("click", matchingHandler);
  }

  function matchingHandler(e) {
    let matchedItem;
    const isImgEl =
      e.target.classList.contains("multipleChoice_5_VideoCard") ||
      e.target.classList.contains("multipleChoice_5_Video") ||
      e.target.classList.contains("multipleChoice_5_VideoTitle");

    if (!isImgEl) {
      return;
    }

    if (e.target.classList.contains("multipleChoice_5_VideoCard")) {
      matchedItem = e.target;
    } else if (e.target.classList.contains("multipleChoice_5_VideoTitle")) {
      matchedItem = e.target.parentElement;
    }

    if (!isGameStart) {
      // открываем кнопку ПРОВЕРИТЬ
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }

    if (matchedItem) {
      if (matchedItem.classList.contains("targetChoice_color")) {
        removeActiveCardClass(matchedItem);
      } else {
        addCheckClass(matchedItem);
      }
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
