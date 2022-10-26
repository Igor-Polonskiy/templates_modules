import {
  scaleImage,
  dropAppend,
  dragAppend,
  getRandomPositionToCard,
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
} from "../../common_files/common_scripts.js";

export function renderDnDClosestTopMarkup(arrayOfElements, taskId) {
  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const taskWrapper = document.getElementById(`${taskId}`)
  const arrayOfElementsLength = arrayOfElements.length;

  let elementsSizesClass = addClassesToElements(
    arrayOfElementsLength
  ).elementsSizes;
  let dragHeightClass = addClassesToElements(arrayOfElementsLength).dragHeight;

  const dropBox = taskWrapper.querySelector(".closestTop_dropPlaceWrapper");
  const dragBox = taskWrapper.querySelector(".closestTop_dragPlaceWrapper");

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );
  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...arrayOfElements]))
  );

  dragBox.classList.add(`${dragHeightClass}`);

  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  taskWrapper.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);

  function onDropBoxClick(event) {
    if (event.target.classList.contains("closestTop_dropPicture_box")) {
      scaleImage(event.target);
    }
  }

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      if (item.children[0].children.length > 1) {
        getRandomPositionToCard(item.children[0].children[1]);
        dragBox.appendChild(item.children[0].children[1]);
      }
      removeActiveCardClass(item);
    });

    checkingAnswerReset(controlsBox, infoBox);
    taskWrapper.addEventListener("pointerdown", mouseDown);
    draggingItem = null;
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    taskWrapper.removeEventListener("pointerdown", mouseDown);

    let winVar = 0;
    [...dropBox.children].forEach((item) => {
      if (item.children[0].children.length > 1) {
        if (
          item.children[0].attributes.getNamedItem("drop-data").value ===
          item.children[0].children[1].attributes.getNamedItem("drag-data")
            .value
        ) {
          winVar += 1;
          addRightChoiceClass(item);
        } else addWrongChoiceClass(item);
      }
    });
    if (winVar === arrayOfElements.length) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
  }

  function addClassesToElements(arrayOfElementsLength) {
    let elementsSizes;
    let dragHeight;
    if (arrayOfElementsLength <= 4) {
      elementsSizes = "closestTop_box_sizes_big";
      dragHeight = "closestTop_DragPlace_height-big";
    } else if (arrayOfElementsLength === 5) {
      elementsSizes = "closestTop_box_sizes_middle";
      dragHeight = "closestTop_DragPlace_height-middle";
    } else if (arrayOfElementsLength === 6) {
      elementsSizes = "closestTop_box_sizes_small";
      dragHeight = "closestTop_DragPlace_height-small";
    }
    return { elementsSizes, dragHeight };
  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    if (!event.target.classList.contains("closestTop_dragPicture_box")) return;

    draggingItem = event.target;

    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";

    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );

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
      draggingItem.style.cursor = "grab";
      document.removeEventListener("pointermove", onMouseMove);
      if (clickWithoutMove) {
        scaleImage(event.target);
      } else if (
        elemBelow.classList.contains("closestTop_dropPlace_imageBox")
      ) {
        dropAppend(elemBelow.parentElement, draggingItem);
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

  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `<div class="closestTop_dropPlace oneMultiChoice_border">
                    <div class='closestTop_dropPlace_Box ${elementsSizesClass}' drop-data="${picture.answerTag}">
                        <div drop-data="${picture.answerTag}" class ="closestTop_dropPlace_imageBox"></div>
                    </div>
                    <div class="closestTop_dropPicture_box ${elementsSizesClass}" style="background-image: url(${picture.imgSrc})"></div>
              </div>
                                  `;
      })
      .join("");
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `<div class="closestTop_dragPicture_box ${elementsSizesClass}"
                draggable="false"
                drag-data="${picture.answerTag}"
                style="background-image: url(${picture.imgSrc_2})">
                </div>`;
      })
      .join("");
  }
}
