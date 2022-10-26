import {
  resetSound,
  onSoundIconClick,
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

export function renderDndOneToOneMarkup(
  arrayOfDropElements,
  arrayOfDragElements,
  taskId
) {
  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const dropId = "drop";
  const dragId = "drag";
  const taskWrapper = document.getElementById(`${taskId}`);

  const soundDataAttribute = "drop-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  const arrayOfElementsLength = Math.max(
    arrayOfDropElements.length,
    arrayOfDragElements.length
  );

  let elementsSizesClass = addClassesToElements(
    arrayOfElementsLength
  ).elementsSizes;
  let dragHeightClass = addClassesToElements(arrayOfElementsLength).dragHeight;

  const dropPlacesCount = arrayOfDropElements.filter((el) => !el.bgSrc).length;
  const dropBox = taskWrapper.querySelector(".dnd_OneToOne_dropPlaceWrapper");
  const dragBox = taskWrapper.querySelector(".dnd_OneToOne_dragPlaceWrapper");

  dragBox.classList.add(`${dragHeightClass}`);

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(arrayOfDropElements)
  );
  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...arrayOfDragElements]))
  );
  renderCheckPanel(taskWrapper, true);
  const { btnReset, btnTest, controlsBox, infoBox } =
    getCheckPanelElements(taskWrapper);

  const audioFiles = taskWrapper.querySelectorAll(".dnd_OneToOne_audio");

  taskWrapper.addEventListener("pointerdown", mouseDown);

  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);
  taskWrapper.addEventListener("click", onIconClick);

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  function onDropBoxClick(event) {
    if (
      event.target.classList.contains("dnd_OneToOne_dropPicture") ||
      event.target.classList.contains("dnd_OneToOne_dropPlace_box")
    ) {
      scaleImage(event.target);
    }
  }
  function addClassesToElements(arrayOfElementsLength) {
    let elementsSizes;
    let dragHeight;
    if (arrayOfElementsLength <= 4) {
      elementsSizes = "dnd_OneToOne_box_sizes_big";
      dragHeight = "dnd_OneToOne_DragPlace_height-big";
    } else if (arrayOfElementsLength === 5) {
      elementsSizes = "dnd_OneToOne_box_sizes_middle";
      dragHeight = "dnd_OneToOne_DragPlace_height-middle";
    } else if (arrayOfElementsLength === 6) {
      elementsSizes = "dnd_OneToOne_box_sizes_small";
      dragHeight = "dnd_OneToOne_DragPlace_height-small";
    }
    return { elementsSizes, dragHeight };
  }

  function onIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function onBtnResetClick() {
    resetSound(soundSetStates);
    [...dropBox.children].forEach((item) => {
      if (item.children[1].children.length === 2) {
        getRandomPositionToCard(item.children[1].children[1]);
        removeActiveCardClass(item.children[1].children[1]);
        dragBox.appendChild(item.children[1].children[1]);
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
    resetSound(soundSetStates);
    let winVar = 0;
    [...dropBox.children].forEach((item) => {
      if (item.children[1].children.length === 2) {
        if (
          item.children[1].children[0].attributes.getNamedItem("drop-data")
            .value ===
          item.children[1].children[1].attributes.getNamedItem("drag-data")
            .value
        ) {
          winVar += 1;

          addRightChoiceClass(item.children[1].children[1]);
        } else addWrongChoiceClass(item.children[1].children[1]);
      }
    });

    if (winVar === dropPlacesCount) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }
    taskWrapper.removeEventListener("pointerdown", mouseDown);
  }

  function mouseDown(event) {
    if (event.button !== 0) return;
    if (
      event.target.classList.contains("dnd_OneToOne_dragPicture") ||
      event.target.classList.contains("dnd_OneToOne_dragTitle")
    ) {
      draggingItem = event.target.parentElement;
    } else if (
      event.target.classList.contains("dnd_OneToOne_dragPicture_box")
    ) {
      draggingItem = event.target;
    } else return;

    draggingItem.style.touchAction = "none";
    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );

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

    function onpointerup(event) {
      resetSound(soundSetStates);

      document.removeEventListener("pointermove", onMouseMove);
      draggingItem.style.cursor = "grab";

      if (clickWithoutMove) {
        if (
          event.target.classList.contains("dnd_OneToOne_dragPicture_box") &&
          event.target.firstElementChild.classList.contains(
            "dnd_OneToOne_dragPicture"
          )
        ) {
          setTimeout(() => scaleImage(event.target.firstElementChild), 0);
        } else if (
          event.target.classList.contains("dnd_OneToOne_dragPicture")
        ) {
          setTimeout(() => scaleImage(event.target), 0);
        }
      } else {
        if (elemBelow.classList.contains("dnd_OneToOne_dropPlace_imageBox")) {
          dropAppend(elemBelow.parentElement, draggingItem);
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else if (
          elemBelow.closest(".dnd_OneToOne_dropPlace") &&
          elemBelow.closest(".dnd_OneToOne_dropPlace").children[2] ===
          draggingItem
        ) {
          dropAppend(
            elemBelow.closest(".dnd_OneToOne_dropPlace"),
            draggingItem
          );
        } else {
          dragAppend(dragBox, draggingItem, findIdx);
        }
      }

      draggingItem.removeEventListener("pointerup", onpointerup);
    }
  }

  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const isTitle =
          picture.title &&
          `<div class='dnd_OneToOne_dropTitle'>${picture.title}</div>`;

        const isSound =
          picture.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_OneToOne_audio" id="${dropId}_${picture.id}${taskId}" src="${picture.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        const isImage =
          picture.imgSrc &&
          `<div class="dnd_OneToOne_dropPicture ${elementsSizesClass}" style="background-image: url(${picture.imgSrc}" draggable="false">
                    </div>`;

        const isBackgroundImage = picture.bgSrc
          ? `<div drop-data="${picture.answerTag}" class ="dnd_OneToOne_dropPlace_box dnd_OneToOne_border ${elementsSizesClass}" style='background-image: url(${picture.bgSrc})'>
             </div>`
          : `<div drop-data="${picture.answerTag}" class="dnd_OneToOne_dropPlace_box ${elementsSizesClass}">
                    <div drop-data="${picture.answerTag}" class="dnd_OneToOne_dropPlace_imageBox"></div>
             </div>`;

        return `<div class="dnd_OneToOne_dropPlace">
                    <div class="dnd_OneToOne_dropPicture_box">
                        ${isImage}
                        ${isSound}
                        ${isTitle}
                    </div>
                    ${isBackgroundImage}
                </div>

                                  `;
      })
      .join("");
  }
  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const isTitle =
          picture.title_2 &&
          `<div class='dnd_OneToOne_dragTitle'>${picture.title_2}</div>`;

        const isImage =
          picture.imgSrc_2 &&
          `<div class="dnd_OneToOne_dragPicture" style="background-image: url(${picture.imgSrc_2}" draggable="false">
                    </div>`;

        const isSound =
          picture.audioSrc_2 &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_OneToOne_audio" id="${dragId}_${picture.id}${taskId}" src="${picture.audioSrc_2}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `<div class="dnd_OneToOne_dragPicture_box ${elementsSizesClass}" draggable="false" drag-data="${picture.answerTag}" sound-data="${picture.id}">
                    ${isImage}
                    ${isSound}
                    ${isTitle}
                </div>

                                  `;
      })
      .join("");
  }
}
