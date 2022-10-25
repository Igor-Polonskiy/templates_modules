import {
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  removeActiveCardClass,
  addCheckClass,
  addRightChoiceClass,
  addWrongChoiceClass,
  getRandomPositionToCard,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function renderSingleChoice_5_Markup(
  arrayOfElements,
  rightAnswer,
  taskId
) {
  let currentActiveCard;
  let isGameStart = false;

  const arrayLength = arrayOfElements.length;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const listContainer = taskWrapper.querySelector(".singleChoice_5_List");

  listContainer.insertAdjacentHTML(
    "beforeend",
    createCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  listContainer.addEventListener("click", matchingHandler);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function createCardsMarkup(pictures) {
    return pictures
      .map((item) => {
        let itemSizes;

        if (arrayLength === 4 || arrayLength === 2) {
          itemSizes = "singleChoice_5_Card_big";
        } else {
          itemSizes = "singleChoice_5_Card_middle";
        }
        const isText =
          item.text &&
          `<div class="singleChoice_5_CardText">${item.text}</div>`;

        return `<div class="singleChoice_5_Card oneMultiChoice_border ${itemSizes}" data="${item.answerTag}" >
                    <video class="singleChoice_5_video" controls
                           src="${item.videoSrc}"
                           id="${item.id}${taskId}"
                           type="video/mp4"
                    >
                    </video>
                    ${isText}
                </div>`;
      })
      .join("");
  }

  function onBtnResetClick() {
    [...listContainer.children].forEach((el) => {
      getRandomPositionToCard(el);
      removeActiveCardClass(el);
      el.firstElementChild.pause();
      el.firstElementChild.currentTime = 0;
      if (el.firstElementChild.classList.contains("noEventElement")) {
        togglePointerEventElement(el.firstElementChild);
      }
    });
    checkingAnswerReset(controlsBox, infoBox);
    listContainer.addEventListener("click", matchingHandler);
    currentActiveCard = null;
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    if (!currentActiveCard) {
      return;
    }

    if (
      currentActiveCard &&
      currentActiveCard.attributes.getNamedItem("data").value === rightAnswer
    ) {
      addRightChoiceClass(currentActiveCard);
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      addWrongChoiceClass(currentActiveCard);
      checkingAnswerNegative(controlsBox, infoBox);
    }
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
      e.target.classList.contains("singleChoice_5_Card") ||
      e.target.classList.contains("singleChoice_5_") ||
      e.target.classList.contains("singleChoice_5_CardText");

    if (!isImgEl) {
      return;
    }

    if (e.target.classList.contains("singleChoice_5_Card")) {
      matchedItem = e.target;
    } else if (e.target.classList.contains("singleChoice_5_CardText")) {
      matchedItem = e.target.parentElement;
    }
    // открываем кнопку ПРОВЕРИТЬ
    if (!isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = true;
    }
    if (matchedItem.classList.contains("targetChoice_color")) {
      removeActiveCardClass(matchedItem);
      // закрываем кнопку ПРОВЕРИТЬ
      isGameStart = false;
      toggleOpacityAndEventsElement(btnTest);
    } else if (matchedItem.classList.contains("singleChoice_5_Card")) {
      currentActiveCard && removeActiveCardClass(currentActiveCard);
      addCheckClass(matchedItem);
      currentActiveCard = matchedItem;
    }
  }
}
