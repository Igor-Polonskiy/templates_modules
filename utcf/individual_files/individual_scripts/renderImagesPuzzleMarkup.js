import {
  scaleImage,
  checkingAnswerPositive,
  checkingAnswerNegative,
  checkingAnswerReset,
  getRandomPositionToCard,
  shuffleCards,
  getBlocksSizes,
  onBtnLeftClick,
  onBtnRightClick,
  showArrows,
  dragAppend,
  dropAppend,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderImagesPuzzleMarkup(
  arrayOfDragElements,
  taskId,
  previewImage,
  numberOfPuzzlePieces,
  orientation
) {
  const puzzle = Array.from(
    Array(numberOfPuzzlePieces),
    (el, index) => (el = { fill: "", answerTag: index + 1 })
  );

  let draggingItem;
  let elemBelow;
  let sliderSetStates = {
    sliderItemWidth: null,
    sliderSize: null,
    sliderWrapperSize: null,
    sliderShift: 0,
  };
  let isGameStart = false;

  const taskWrapper = document.querySelector(`#${taskId}`);
  const dragBox = taskWrapper.querySelector(".dnd_imagesPuzzle_slider_box");
  const dropBox = taskWrapper.querySelector(".dnd_imagesPuzzle_puzzleWrapper");
  const leftBtn = taskWrapper.querySelector(".arrowButton_left_event");
  const rightBtn = taskWrapper.querySelector(".arrowButton_right_event");

  dropBox.lastElementChild.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(puzzle)
  );

  previewImage &&
    dropBox.insertAdjacentHTML(
      "afterbegin",
      createPreviewImageMarkup(previewImage)
    );

  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...arrayOfDragElements]))
  );
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  addSizesToDropPlaceWrapper(orientation, numberOfPuzzlePieces);

  getBlocksSizes(sliderSetStates, dragBox);

  showArrows(sliderSetStates, leftBtn, rightBtn);

  sliderSetStates.sliderWrapperSize = dragBox.offsetParent.clientWidth;

  if (sliderSetStates.sliderSize < sliderSetStates.sliderWrapperSize) {
    rightBtn.classList.add("noDisplayElement");
  }

  taskWrapper.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);
  leftBtn.addEventListener("click", onSliderBtnLeftClick);
  rightBtn.addEventListener("click", onSliderBtnRightClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);

  function onDropBoxClick(event) {
    if (event.target.classList.contains("dnd_imagesPuzzle_previewImageBox")) {
      scaleImage(event.target);
    }
  }

  function addSizesToDropPlaceWrapper(orientation, numberOfPuzzlePieces) {
    if (orientation === "v") {
      if (numberOfPuzzlePieces === 3) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_big",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_small"
        );
      } else if (numberOfPuzzlePieces === 4) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_middle",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_middle"
        );
      } else if (numberOfPuzzlePieces === 6) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_big",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_middle"
        );
      } else if (numberOfPuzzlePieces === 9) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_big",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_big"
        );
      }
    } else if (orientation === "h") {
      if (numberOfPuzzlePieces === 3) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_small",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_big"
        );
      } else if (numberOfPuzzlePieces === 6) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_middle",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_big"
        );
      } else if (numberOfPuzzlePieces === 8) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_middle",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_biggest"
        );
      } else if (numberOfPuzzlePieces === 12) {
        dropBox.lastElementChild.classList.add(
          "dnd_imagesPuzzle_dropPlaceWrapper_height_big",
          "dnd_imagesPuzzle_dropPlaceWrapper_width_biggest"
        );
      }
    }
  }

  function onSliderBtnLeftClick(e) {
    onBtnLeftClick(sliderSetStates, dragBox, leftBtn, rightBtn);
  }
  function onSliderBtnRightClick(e) {
    onBtnRightClick(sliderSetStates, dragBox, leftBtn, rightBtn);
  }

  function onBtnResetClick() {
    [...dropBox.lastElementChild.children].forEach((item) => {
      if (item.children.length > 1) {
        getRandomPositionToCard(item.children[1]);

        dragBox.appendChild(item.children[1]);
      }
    });

    sliderSetStates.sliderShift = 0;
    sliderSetStates.sliderSize = dragBox.scrollWidth;

    showArrows(sliderSetStates, leftBtn, rightBtn);

    dragBox.style.left = `${sliderSetStates.sliderShift}px`;
    draggingItem = null;
    checkingAnswerReset(controlsBox, infoBox);
    taskWrapper.addEventListener("pointerdown", mouseDown);
    dropBox.addEventListener("pointerdown", onDropBoxClick);
    // закрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }
  function onBtnTestClick() {
    let winVar = 0;
    [...dropBox.lastElementChild.children].forEach((item) => {
      if (item.children.length > 1) {
        if (
          item.children[0].attributes.getNamedItem("drop-data").value ===
          item.children[1].attributes.getNamedItem("drag-data").value
        ) {
          winVar += 1;
        }
      }
    });

    if (winVar === numberOfPuzzlePieces) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    taskWrapper.removeEventListener("pointerdown", mouseDown);
    dropBox.removeEventListener("pointerdown", onDropBoxClick);
  }

  function createPreviewImageMarkup(previewImage) {
    return `<div class="dnd_imagesPuzzle_previewImageBox" style="background-image: url(${previewImage})">
            </div>
                                  `;
  }
  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `<div class="dnd_imagesPuzzle_dropPlace">
                  <div class="dnd_imagesPuzzle_dropPlacePart" draggable="false" drop-data="${picture.answerTag}"></div>
                </div>
                                  `;
      })
      .join("");
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((part) => {
        return `
            <div class='dnd_imagesPuzzle_dragImagesBox' drag-data="${part.answerTag}" style="background-image: url(${part.imgSrc})">
            </div>
            `;
      })
      .join("");
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (!event.target.classList.contains("dnd_imagesPuzzle_dragImagesBox"))
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

      sliderSetStates.sliderSize = dragBox.scrollWidth;

      showArrows(sliderSetStates, leftBtn, rightBtn);

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    draggingItem.addEventListener("pointerup", onpointerup);

    function onpointerup(event) {
      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";
      if (clickWithoutMove) {
        setTimeout(() => scaleImage(event.target), 0);
      } else {
        if (elemBelow.classList.contains("dnd_imagesPuzzle_dropPlacePart")) {
          dropAppend(elemBelow.parentElement, draggingItem);
          if (!isGameStart) {
            // открываем кнопку ПРОВЕРИТЬ
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else {
          dragAppend(dragBox, draggingItem, findIdx);
        }
        sliderSetStates.sliderSize = dragBox.scrollWidth;

        showArrows(sliderSetStates, leftBtn, rightBtn);
      }

      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }
}
