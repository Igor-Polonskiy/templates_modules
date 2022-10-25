import {
  dropAppend,
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

export function renderMoveWordsIntoSentenceWithCopyMarkup(
  textForRender,
  dragTextForRender,
  taskId
) {
  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const taskWrapper=document.getElementById(`${taskId}`)

  const dropBox = taskWrapper.querySelector(
    ".dnd_MoveWordsWithCopy_dropPlaceWrapper"
  );

  const dragBox = taskWrapper.querySelector(
    ".dnd_MoveWordsWithCopy_dragPlaceWrapper"
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
    ".dnd_MoveWordsWithCopy_dropPlacePart"
  );

  taskWrapper.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  function onBtnResetClick() {
    [...allSpans].forEach((el) => {
      removeActiveCardClass(el);
      if (el.children.length > 0) {
        el.removeChild(el.firstElementChild);
      }
    });

    checkingAnswerReset(controlsBox, infoBox);
    draggingItem = null;
    taskWrapper.addEventListener("pointerdown", mouseDown);
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
      return '<div class="dnd_MoveWordsWithCopy_dropPlacePart "></div>';
    }
    return str.replace(/&#9873;/gi, changeSymbol);
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `
                    <div class='dnd_MoveWordsWithCopy_dragPlace' drag-data="${picture.answerTag}">
                   ${picture.text}
                    </div>
                                          `;
      })
      .join("");
  }
  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const newText = changeIncomingString(picture.text);
        return `<div class="dnd_MoveWordsWithCopy_dropPlace " >

       ${newText}

        </div>
        `;
      })
      .join("");
  }

  function mouseDown(event) {
    let shiftX;
    let shiftY;
    if (event.button !== 0) return;
    if (event.target.classList.contains("dnd_MoveWordsWithCopy_dragPlace")) {
      if (
        !event.target.classList.contains(
          "dnd_MoveWordsWithCopy_dragPlace_clone"
        )
      ) {
        draggingItem = event.target.cloneNode(true);
        draggingItem.classList.add("dnd_MoveWordsWithCopy_dragPlace_clone");
      
        draggingItem.style.touchAction = "none";
        shiftX = event.clientX - event.target.getBoundingClientRect().left;
        shiftY = event.clientY - event.target.getBoundingClientRect().top;
      } else if (
        event.target.classList.contains("dnd_MoveWordsWithCopy_dragPlace_clone")
      ) {
        draggingItem = event.target;
        draggingItem.style.touchAction = "none";
        shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        shiftY = event.clientY - draggingItem.getBoundingClientRect().top;
      }
    } else {
      return;
    }

    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)
    draggingItem.style.cursor = "grabbing";

    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    let clickWithoutMove = true;
    draggingItem.style.visibility = "hidden";
    elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    draggingItem.style.visibility = "visible";

    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.touchAction = "auto";
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        taskWrapper.appendChild(draggingItem);
      }
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
    taskWrapper.addEventListener("pointerup", onpointerup);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
      if (elemUnderPount !== draggingItem) {
        draggingItem.remove();
      }
      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА

    function onpointerup(e) {
      document.removeEventListener("pointermove", onMouseMove);
      const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
      if (elemUnderPount !== draggingItem) {
        draggingItem.remove();
        taskWrapper.removeEventListener("pointerup", onpointerup);
        return;
      }
      // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
      if (elemBelow) {
        if (
          elemBelow.closest(".dnd_MoveWordsWithCopy_dropPlacePart") &&
          elemBelow.closest(".dnd_MoveWordsWithCopy_dropPlacePart").children
            .length === 0
        ) {
          elemBelow = elemBelow.closest(".dnd_MoveWordsWithCopy_dropPlacePart");
          dropAppend(elemBelow, draggingItem);
          elemBelow = null;
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else {
          draggingItem.remove();
        }
      } else {
        draggingItem.remove();
      }
      taskWrapper.removeEventListener("pointerup", onpointerup);
    }
  }
}
