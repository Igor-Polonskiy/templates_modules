import {
  dropAppend,
  dragAppend,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  addRightChoiceClass,
  addWrongChoiceClass,
  removeActiveCardClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements
} from "../../common_files/common_scripts.js"

export function renderAlphabetMatchingUpperAndLowerCaseLetters(
  arrayOfElements,
  taskId
) {
  const taskWrapper = document.querySelector(`#${taskId}`);

  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const alphabetDropPlace = taskWrapper.querySelector(
    ".alphabetDropPlace_capital "
  );
  const alphabetDragPlace = taskWrapper.querySelector(
    ".alphabetDragPlace_capital "
  );

  renderCheckPanel(taskWrapper, true)
  const { btnReset, btnTest, controlsBox, infoBox } = getCheckPanelElements(taskWrapper)

  // создание разметки
  createDropCardsMarkup(arrayOfElements);
  createDragCardsMarkup(arrayOfElements);

  const letterCard_drop = taskWrapper.querySelectorAll(
    ".letterCardDrop_capital"
  );
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);
  alphabetDragPlace.addEventListener("pointerdown", mouseDown);
  alphabetDropPlace.addEventListener("click", localReset_letter);

  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function createDropCardsMarkup(arrayOfElements) {
    arrayOfElements.forEach((elem) => {
      const dropPlace = document.createElement("div");
      dropPlace.classList.add(
        "letterCardDrop_capital",
        "alphabetCard_colors",
        "letterCardDrop_capital_border"
      );

      const paragraph = document.createElement("div");
      paragraph.classList.add("letterCardDrop_capital_p");
      paragraph.append(elem.letterCapital);

      const span = document.createElement("div");
      span.classList.add("localReset");
      span.innerHTML = `&times;`;
      span.setAttribute("title", "Очистить");
      span.style.pointerEvents = "none";
      dropPlace.appendChild(paragraph);
      dropPlace.appendChild(span);

      dropPlace.setAttribute("drop-data", elem.data);
      alphabetDropPlace.appendChild(dropPlace);
    });
  }

  function createDragCardsMarkup(arrayOfElements) {
    const alphabetRandomLetters = arrayOfElements.sort(() =>
      Math.random() > 0.5 ? 1 : -1
    );
    alphabetRandomLetters.forEach((elem) => {
      const div = document.createElement("div");
      div.classList.add("letterCardDrag_small", "alphabetCard_colors");
      div.setAttribute("drag-data", elem.data);

      const paragraph = document.createElement("div");
      paragraph.classList.add("letterCardDrag_small_p");
      paragraph.append(elem.letterSmall);

      div.appendChild(paragraph);
      alphabetDragPlace.appendChild(div);
    });
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (event.target.classList.contains("letterCardDrag_small")) {
      draggingItem = event.target;
    } else return;

    const findIdx = [...alphabetDragPlace.children].findIndex(
      (el) => el === draggingItem
    );

    const elemDraggingBanBorder = taskWrapper; //элемент за границы которого запрещён вылет перетаскиваемой фигуры

    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)
    draggingItem.style.cursor = "grabbing";

    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
    let limits = {
      top: elemDraggingBanBorder.offsetTop,
      right:
        elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft,
      bottom:
        elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop,
      left: elemDraggingBanBorder.offsetLeft,
    };

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    let clickWithoutMove = true;

    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);
      }
      moveAt(event.pageX, event.pageY);
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
      dragAppend(alphabetDragPlace, draggingItem, findIdx);

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    draggingItem.addEventListener("pointerup", onpointerup);

    // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
    // draggingItem.onpointerup = function () {
    function onpointerup() {
      draggingItem.style.cursor = "grab";
      document.removeEventListener("pointermove", onMouseMove);

      // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
      if (elemBelow) {
        if (elemBelow.classList.contains("letterCardDrop_capital")) {
          elemBelow.classList.add("alphabetCard_colors_active");
          elemBelow.style.pointerEvents = "none";
          draggingItem.classList.remove(
            "letterCardDrag_small",
            "alphabetCard_colors"
          );
          draggingItem.classList.add("letterCardDrag_small_action");
          dropAppend(elemBelow, draggingItem);
          elemBelow.children[1].style.pointerEvents = "auto";
          // закрываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else {
          dragAppend(alphabetDragPlace, draggingItem, findIdx);
        }
      }

      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }

  function onBtnResetClick() {
    letterCard_drop.forEach((elem) => {
      if (elem.children.length > 2) {
        elem.children[2].classList.add("letterCardDrag_small");
        elem.children[2].classList.remove("letterCardDrag_small_action");
        dropAppend(alphabetDragPlace, elem.children[2]);
        elem.children[1].style.pointerEvents = "none";
        elem.style.pointerEvents = "auto";
      }
      elem.classList.add(
        "alphabetCard_colors",
        "letterCardDrop_capital_border"
      );
      elem.classList.remove("alphabetCard_colors_active");
      removeActiveCardClass(elem)
    });
    checkingAnswerReset(controlsBox, infoBox);
    draggingItem = null;
    alphabetDragPlace.addEventListener("pointerdown", mouseDown);
    alphabetDropPlace.addEventListener("click", localReset_letter);
    // скрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    let winCount = 0;
    letterCard_drop.forEach((elem) => {
      if (
        elem.children.length > 2 &&
        elem.children[2].attributes.getNamedItem("drag-data").value ===
        elem.attributes.getNamedItem("drop-data").value
      ) {
        winCount += 1;

        addRightChoiceClass(elem)
      } else {
        addWrongChoiceClass(elem)
      }
      elem.classList.remove("letterCardDrop_capital_border");
    });
    if (winCount === arrayOfElements.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }

    alphabetDragPlace.removeEventListener("pointerdown", mouseDown);
    alphabetDropPlace.removeEventListener("click", localReset_letter);
  }

  function localReset_letter(event) {
    if (!event.target.classList.contains("localReset")) return;
    event.target.parentElement.childNodes[1].style.pointerEvents = "none";

    event.target.parentElement.classList.add("alphabetCard_colors");
    event.target.parentElement.classList.remove("alphabetCard_colors_active");

    event.target.parentElement.children[2].classList.add(
      "letterCardDrag_small"
    );
    event.target.parentElement.children[2].classList.remove(
      "letterCardDrag_small_action"
    );

    event.target.parentElement.style.pointerEvents = "auto";

    dropAppend(alphabetDragPlace, event.target.parentElement.children[2]);
  }

}
