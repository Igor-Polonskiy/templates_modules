import {
  dropAppend,
  dragAppend,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  shuffleCards,
  addRightChoiceClass,
  addWrongChoiceClass,
  removeActiveCardClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../_common_files/common_scripts.js";

export function renderMoveWordsIntoSentenceWithoutCopyMarkup(
  textForRender,
  dragTextForRender,
  taskId
) {
  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const taskWrapper = document.getElementById(`${taskId}`)

  const dropBox = taskWrapper.querySelector(
    ".dnd_MoveWordsNoCopy_dropPlaceWrapper"
  );

  const dragBox = taskWrapper.querySelector(
    ".dnd_MoveWordsNoCopy_dragPlaceWrapper"
  );

  dropBox.insertAdjacentHTML(
    "beforeend",

    createDropPictureCardsMarkup(textForRender)
  );
  dragBox.insertAdjacentHTML(
    "beforeend",

    createDragPictureCardsMarkup(shuffleCards([...dragTextForRender]))
  );
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  const allSpans = taskWrapper.querySelectorAll(
    ".dnd_MoveWordsNoCopy_dropPlacePart"
  );

  taskWrapper.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  function onBtnResetClick() {
    [...allSpans].forEach((el, index) => {
      removeActiveCardClass(el);
      if (el.children.length > 0) {
        let randomPos = Math.floor(Math.random() * 12);

        el.firstElementChild.style.order = randomPos;

        dragBox.appendChild(el.firstElementChild);
      }
      taskWrapper.addEventListener("pointerdown", mouseDown);
    });

    checkingAnswerReset(controlsBox, infoBox);
    draggingItem = null;
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    taskWrapper.removeEventListener("pointerdown", mouseDown);
    let winCount = 0;

    [...allSpans].forEach((el, index) => {
      if (
        el.children[0]?.attributes
          .getNamedItem("drag-data")
          .value.includes(String(index + 1))
      ) {
        winCount += 1;
        addRightChoiceClass(el);
      } else addWrongChoiceClass(el);
    });

    if (winCount === [...allSpans].length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
  }

  function changeIncomingString(str) {
    function changeSymbol(match) {
      return '<div class="dnd_MoveWordsNoCopy_dropPlacePart"></div>';
    }
    return str.replace(/&#9873;/gi, changeSymbol);
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `
                    <div class='dnd_MoveWordsNoCopy_dragPlace' drag-data="${picture.tag}">
                   ${picture.text}
                    </div>
                                          `;
      })
      .join("");
  }
  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const isTitle =
          picture.title &&
          `<div class="dnd_MoveWordsNoCopy_dropPlaceTitle">${picture.title}</div>`;
        const newText = changeIncomingString(picture.text);
        return `<div class="dnd_MoveWordsNoCopy_dropPlace" >
        ${isTitle}
        <div class="dnd_MoveWordsNoCopy_dropPlaceText" drag-data="${picture.tag}">${newText}</div>

        </div>
        `;
      })
      .join("");
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (!event.target.classList.contains("dnd_MoveWordsNoCopy_dragPlace"))
      return;

    draggingItem = event.target;
    // находим индекс элемента, который берем в списке отрисованных. dragBox - контейнер для перетаскиваемых элементов
    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );

    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)

    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    draggingItem.style.position = "absolute";
    draggingItem.style.zIndex = 1000;

    taskWrapper.appendChild(draggingItem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    let clickWithoutMove = true;
    function onMouseMove(event) {
      let newLocation = {
        x: limits.left,
        y: limits.top,
      };
      if (event.pageX > limits.right) {
        newLocation.x = limits.right;
      } else if (event.pageX > limits.left) {
        newLocation.x = event.pageX;
      }
      if (event.pageY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (event.pageY > limits.top) {
        newLocation.y = event.pageY;
      }

      clickWithoutMove = false;
      moveAt(newLocation.x, newLocation.y);

      if (!event.composedPath().includes(draggingItem)) {
        window.addEventListener("pointerup", moveOut);
      }
      if (event.composedPath().includes(draggingItem)) {
        window.removeEventListener("pointerup", moveOut);
      }

      draggingItem.style.visibility = "hidden";
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);

      draggingItem.style.visibility = "visible";

      if (!elemBelow) return;
    }
    document.addEventListener("pointermove", onMouseMove);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      dragAppend(dragBox, draggingItem, findIdx);

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }

    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup() {
      draggingItem.style.cursor = "grab";
      if (clickWithoutMove) {
        dragAppend(dragBox, draggingItem, findIdx);

        return document.removeEventListener("pointermove", onMouseMove);
      }
      document.removeEventListener("pointermove", onMouseMove);

      if (elemBelow.classList.contains("dnd_MoveWordsNoCopy_dropPlacePart")) {
        dropAppend(elemBelow, draggingItem);
        // открываем кнопку ПРОВЕРИТЬ
        if (!isGameStart) {
          toggleOpacityAndEventsElement(btnTest);
          isGameStart = true;
        }
      } else {
        dragAppend(dragBox, draggingItem, findIdx);
      }
      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }
}
