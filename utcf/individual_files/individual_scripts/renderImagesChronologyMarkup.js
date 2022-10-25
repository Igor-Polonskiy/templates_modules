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
  scaleImage,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../_common_files/common_scripts.js";


export function renderImagesChronologyMarkup(arrayOfElements, taskId) {
  const taskWrapper = document.getElementById(`${taskId}`);

  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const arrayOfElementsLength = arrayOfElements.length;

  let elementsSizes = addClassesToElements(arrayOfElementsLength).elementsSizes;
  let dragHeight = addClassesToElements(arrayOfElementsLength).dragHeight;

  const dropBox = taskWrapper.querySelector(".chronoDropPlace");
  const dragBox = taskWrapper.querySelector(".chronoDragPlace");
  dragBox.classList.add(`${dragHeight}`);

  dragBox.insertAdjacentHTML(
    "beforeend",
    createPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  dropBox.insertAdjacentHTML(
    "beforeend",
    createNumbersCardsMarkup(arrayOfElements)
  );
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);
  taskWrapper.addEventListener("pointerdown", mouseDown);

  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function addClassesToElements(arrayOfElementsLength) {
    let elementsSizes;
    let dragHeight;
    if (arrayOfElementsLength <= 4) {
      elementsSizes = "chronoBox_sizes_big";
      dragHeight = "chronoDragPlace_height-big";
    } else if (arrayOfElementsLength === 5) {
      elementsSizes = "chronoBox_sizes_middle";
      dragHeight = "chronoDragPlace_height-middle";
    } else if (arrayOfElementsLength === 6) {
      elementsSizes = "chronoBox_sizes_small";
      dragHeight = "chronoDragPlace_height-small";
    }
    return { elementsSizes, dragHeight };
  }

  function createPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `
          <div class='chronoDragPictureBox oneMultiChoice_border ${elementsSizes}' data="${picture.answerTag}"  style='background-image:url(${picture.imgSrc})'>
                           </div>
                            `;
      })
      .join("");
  }
  function createNumbersCardsMarkup(pictures) {
    return pictures
      .map((picture, index) => {
        return `<div class="chronoDropBox ${elementsSizes}" data="${index + 1}">
            <div class="chronoDropBoxNumbers">${index + 1}</div>
          </div>
          `;
      })
      .join("");
  }

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      if (item.children.length > 1) {
        let randomPos = Math.floor(Math.random() * 12);
        item.children[1].style.order = randomPos;
        removeActiveCardClass(item.children[1]);
        dragBox.appendChild(item.children[1]);
      }
    });
    checkingAnswerReset(controlsBox, infoBox);
    taskWrapper.addEventListener("pointerdown", mouseDown);
    // cкрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
    draggingItem = null;
  }

  function onBtnTestClick() {
    taskWrapper.removeEventListener("pointerdown", mouseDown);

    let winCount = 0;

    [...dropBox.children].forEach((item, index) => {
      if (item.children[1]) {
        if (
          item.children[1].attributes.getNamedItem("data").value ===
          item.attributes.getNamedItem("data").value
        ) {
          winCount += 1;
          addRightChoiceClass(item.children[1]);
        } else addWrongChoiceClass(item.children[1]);
      }
    });

    if (winCount === arrayOfElements.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
  }
  function mouseDown(event) {
    if (event.button !== 0) return;

    if (!event.target.classList.contains("chronoDragPictureBox")) return;

    draggingItem = event.target;
    // находим индекс элемента, который берем в списке отрисованных. dragBox - контейнер для перетаскиваемых элементов
    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );

    draggingItem.style.touchAction = "none"; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ)

    draggingItem.style.cursor = "grabbing";
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    // ЛИМИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
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

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    let clickWithoutMove = true;

    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);
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

      draggingItem.hidden = true;
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      draggingItem.hidden = false;

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
      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";
      if (clickWithoutMove) {
        scaleImage(event.target)
      } else {
        if (elemBelow.classList.contains("chronoDropBox")) {
          dropAppend(elemBelow, draggingItem);
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else {
          dragAppend(dragBox, draggingItem, findIdx);
        }
      }
      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }
}
