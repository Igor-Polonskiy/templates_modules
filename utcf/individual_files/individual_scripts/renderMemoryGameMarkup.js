import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerReset,
  getRandomPositionToCard,
  shuffleCards,
  renderCheckPanel,
  getCheckPanelElements,
  togglePointerEventElement,
} from "../../common_files/common_scripts.js";

export function renderMemoryGameMarkup(arrayOfElements, taskId, coverImage) {
  let hasFlippedCard = false;
  let firstCard;
  let secondCard;
  let lockBoard = false;

  let timerId;

  const arrayLength = arrayOfElements.length;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const listContainer = taskWrapper.querySelector(
    ".memoryCards_1_memoryCardsWrapper"
  );

  listContainer.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );
  renderCheckPanel(taskWrapper, false);
  const { btnReset, controlsBox, infoBox } = getCheckPanelElements(taskWrapper);

  const cards = taskWrapper.querySelectorAll(".memoryCards_1_memoryCard");

  listContainer.addEventListener("pointerdown", onCardClick);
  btnReset.addEventListener("click", onBtnResetClick);

  // отслеживаем, открыта ли модалка и увеличенной картинкой, чтобы при ее закрытии страница не переворачивалась (при тач)
  getIsModalOpen();

  function getIsModalOpen() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        if (mutationRecord.addedNodes.length > 0) {
          clearTimeout(timerId);
        } else if (firstCard && secondCard) {
          checkForMatch();
        }
      });
    });

    const target = document.body;

    observer.observe(target, {
      childList: true,
    });
  }

  function createPictureCardsMarkup(items) {
    return items
      .map((item) => {
        let widthItem;
        if (arrayLength === 10) {
          widthItem = `"width: calc(100% / 5 - 10px)"`;
        } else if (arrayLength === 8) {
          widthItem = `"width: calc(100% / 4 - 10px)"`;
        } else if (arrayLength === 6) {
          widthItem = `"width: calc(100% / 3 - 10px)"`;
        }
        const isText =
          item.text &&
          `<div class='memoryCards_1_memoryCardTitle'>${item.text}</div>`;
        const isImage =
          item.imgSrc &&
          `
          <div class="memoryCards_1_memoryCardFaceImg" style='background-image: url(${item.imgSrc})'>
          <div class="zoom_open_button_white memoryCards_1_enlarge_picture" title="Увеличить изображение">
              <div class="icon_zoomPicture whiteZoomImg"></div>
          </div>

          </div>
          `;

        return `
          <div
          class="memoryCards_1_memoryCard"
          data-card = "${item.answerTag}"
          style=${widthItem}
          >
          <div class="memoryCards_1_memoryCardCover" style='background-image: url(${coverImage})'></div>
          <div class="memoryCards_1_memoryCardFace memoryCards_1_memoryCardFace_hidden">

          ${isImage}
          ${isText}
          </div>
          </div>
          `;
      })
      .join("");
  }

  function onBtnResetClick() {
    [...cards].forEach((el) => {
      el.classList.remove("memoryCards_1_is-flipped");
      el.lastElementChild.classList.add("memoryCards_1_memoryCardFace_hidden");
    });
    shuffle([...cards]);
    checkingAnswerReset(controlsBox, infoBox);
    if (listContainer.classList.contains("noEventElement")) {
      togglePointerEventElement(listContainer);
    }
  }

  function onCardClick(e) {
    if (e.target.classList.contains("memoryCards_1_enlarge_picture")) {
      scaleImage(e.target.parentElement);
    }

    if (!e.target.classList.contains("memoryCards_1_memoryCardCover")) return;

    if (e.target.classList.contains("memoryCards_1_memoryCardCover")) {
      if (lockBoard) return;

      if (e.target.offsetParent === firstCard) return;

      e.target.offsetParent.classList.add("memoryCards_1_is-flipped");
      e.target.nextElementSibling.classList.remove(
        "memoryCards_1_memoryCardFace_hidden"
      );

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = e.target.offsetParent;

        return;
      }

      secondCard = e.target.offsetParent;
      lockBoard = true;
    }

    checkForMatch();
    if (
      [...cards].filter((el) =>
        el.classList.contains("memoryCards_1_is-flipped")
      ).length === [...cards].length
    ) {
      checkingAnswerPositive(controlsBox, infoBox);
      togglePointerEventElement(listContainer);
    }
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    resetBoard();
  }

  function unflipCards() {
    timerId = setTimeout(() => {
      firstCard.classList.remove("memoryCards_1_is-flipped");
      secondCard.classList.remove("memoryCards_1_is-flipped");
      firstCard.children[1].classList.add(
        "memoryCards_1_memoryCardFace_hidden"
      );
      secondCard.children[1].classList.add(
        "memoryCards_1_memoryCardFace_hidden"
      );

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function shuffle(cards) {
    cards.forEach((card) => {
      getRandomPositionToCard(card);
    });
  }
}
