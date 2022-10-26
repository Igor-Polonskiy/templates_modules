import {
  scaleImage,
  dropAppend,
  resetSound,
  onSoundIconClick,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  addRightChoiceClass,
  addWrongChoiceClass,
  removeActiveCardClass,
  shuffleCards,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../common_files/common_scripts.js";

export function renderDndCopyManyToOneMarkup(
  arrayOfDropElements,
  arrayOfDragElements,
  taskId,
  answer
) {
  let draggingItem;
  let elemBelow;
  let maxQuantity;
  const dropId = "drop";
  const dragId = "drag";
  let isGameStart = false;
  const taskWrapper = document.getElementById(`${taskId}`)
  const soundDataAttribute = "drop-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };

  const arrayOfDropElementsLength = arrayOfDropElements.length;
  // ограничения на количество перетаскиваемых в поле элементов
  switch (arrayOfDropElementsLength) {
    case 1:
      maxQuantity = 24;
      break;
    case 2:
      maxQuantity = 12;
      break;
    case 3:
      maxQuantity = 6;
      break;
    case 4:
      maxQuantity = 4;
      break;
    default:
      break;
  }

  const dropBox = taskWrapper.querySelector(
    ".dnd_copy-ManyToOne_dropPlaceWrapper"
  );

  const dragBox = taskWrapper.querySelector(
    ".dnd_copy-ManyToOne_dragPlaceWrapper"
  );

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

  taskWrapper.addEventListener("click", onIconClick);
  const audioFiles = taskWrapper.querySelectorAll(".dnd_copy-ManyToOne_audio");
  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);
  taskWrapper.addEventListener("pointerdown", mouseDown);

  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  dropBox.addEventListener("pointerdown", onDropBoxClick);

  function onIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function onDropBoxClick(event) {
    if (!event.target.classList.contains("dnd_copy-ManyToOne_dropPictureBox"))
      return;
    scaleImage(event.target);
  }

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      [...item.lastElementChild.children].forEach((elem) => {
        item.lastElementChild.removeChild(elem);
      });
      removeActiveCardClass(item.lastElementChild);
    });
    resetSound(soundSetStates);
    checkingAnswerReset(controlsBox, infoBox);
    draggingItem = null;
    taskWrapper.addEventListener("pointerdown", mouseDown);
    // скрываем кнопку ПРОВЕРИТЬ
    if (isGameStart) {
      toggleOpacityAndEventsElement(btnTest);
      isGameStart = false;
    }
  }

  function onBtnTestClick() {
    let winVar = 0;
    let count = 0;

    [...dropBox.children].forEach((item) => {
      [...item.lastElementChild.children].forEach((elem) => {
        if (
          elem.attributes.getNamedItem("drag-data").value ===
          item.attributes.getNamedItem("drop-data").value
        ) {
          count += 1;
        }
      });
      if (count === answer[item.attributes.getNamedItem("drop-data").value]) {
        winVar += 1;
        count = 0;
        addRightChoiceClass(item.lastElementChild);
      } else addWrongChoiceClass(item.lastElementChild);
    });

    if (winVar === arrayOfDropElementsLength) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }

    taskWrapper.removeEventListener("pointerdown", mouseDown);
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures

      .map((picture) => {
        const isText =
          picture.text &&
          `<div class='dnd_copy-ManyToOne_dragTitle'>${picture.text}</div>`;
        const isImage =
          picture.imgSrc &&
          ` <div class='dnd_copy-ManyToOne_dragPlacePicture' drag-data=${picture.answerTag} style="background-image: url(${picture.imgSrc})">
                    </div>`;

        const isSound =
          picture.audioSrc_2 &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_copy-ManyToOne_audio" id="${dragId}_${picture.id}${taskId}" src="${picture.audioSrc_2}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;
        return `
                    <div class='dnd_copy-ManyToOne_dragPlace' drag-data=${picture.answerTag} >
                     ${isImage}
                    ${isSound}

                     ${isText}
                    </div>
                                          `;
      })
      .join("");
  }

  function createDropPictureCardsMarkup(pictures) {
    let elementWidth = `"width:calc(100% / ${arrayOfDropElementsLength} - 5px)"`;

    return pictures
      .map((picture) => {
        const isImage =
          picture.imgSrc &&
          ` <div class='dnd_copy-ManyToOne_dropPictureBox'
                        style="background-image: url(${picture.imgSrc})"
                        ></div>`;
        const isText =
          picture.text &&
          `<div class='dnd_copy-ManyToOne_dropTitle'>${picture.text}</div>`;
        const isSound =
          picture.audioSrc &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_copy-ManyToOne_audio" id="${dropId}_${picture.id}${taskId}" src="${picture.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>

            </div>`;

        return `<div class="dnd_copy-ManyToOne_dropPlace" drop-data="${picture.answerTag}" style=${elementWidth}  >
                       ${isImage}
                       ${isSound}
                       ${isText}

                        <div class='dnd_copy-ManyToOne_dropPlacePart'
                         draggable="false"
                        drop-data="${picture.answerTag}"></div>
                        </div>
                        `;
      })
      .join("");
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (
      event.target.classList.contains("dnd_copy-ManyToOne_dragPlacePicture") ||
      event.target.classList.contains("dnd_copy-ManyToOne_dragTitle")
    ) {
      draggingItem = event.target.parentElement;
    } else if (
      event.target.classList.contains("dnd_copy-ManyToOne_dragPlace")
    ) {
      draggingItem = event.target;
    } else return;

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

    if (!draggingItem.classList.contains("dnd_copy-ManyToOne_clone")) {
      draggingItem = draggingItem.cloneNode(true);
      draggingItem.classList.add("dnd_copy-ManyToOne_clone");
    }
    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    // elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    let clickWithoutMove = true;
    function onMouseMove(event) {
      if (clickWithoutMove) {
        draggingItem.style.touchAction = "auto";
        draggingItem.style.position = "absolute";
        draggingItem.style.zIndex = 1000;
        taskWrapper.appendChild(draggingItem);
      }
      resetSound(soundSetStates);

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
      const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);

      if (
        elemUnderPount === null ||
        (elemUnderPount !== draggingItem &&
          !elemUnderPount.classList.contains("dnd_copy-ManyToOne_dragPlace") &&
          !elemUnderPount.classList.contains(
            "dnd_copy-ManyToOne_dragPlacePicture"
          ) &&
          !elemUnderPount.classList.contains("dnd_copy-ManyToOne_dragTitle") &&
          !elemUnderPount.classList.contains(
            "dnd_copy-ManyToOne_dropPlacePart"
          ))
      ) {
        draggingItem.remove();
      }

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }
    taskWrapper.addEventListener("pointerup", onpointerup);

    function onpointerup() {
      if (draggingItem) draggingItem.style.cursor = "grab";
      document.removeEventListener("pointermove", onMouseMove);

      if (clickWithoutMove) {
        if (
          event.target.classList.contains("dnd_copy-ManyToOne_dragPlace") &&
          event.target.firstElementChild.classList.contains(
            "dnd_copy-ManyToOne_dragPlacePicture"
          )
        ) {
           scaleImage(event.target.firstElementChild)
        } else if (
          event.target.classList.contains("dnd_copy-ManyToOne_dragPlacePicture")
        ) {
           scaleImage(event.target)
        }

        taskWrapper.removeEventListener("pointerup", onpointerup);
      }

      if (!clickWithoutMove && elemBelow) {
        // открываем кнопку ПРОВЕРИТЬ
        if (!isGameStart) {
          toggleOpacityAndEventsElement(btnTest);
          isGameStart = true;
        }
        if (
          elemBelow.classList.contains("dnd_copy-ManyToOne_dropPlacePart") &&
          elemBelow.children.length < maxQuantity
        ) {
          dropAppend(elemBelow, draggingItem);
        } else if (
          elemBelow.classList.contains("dnd_copy-ManyToOne_dragPlace") &&
          !elemBelow.parentElement.classList.contains(
            "dnd_copy-ManyToOne_dragPlaceWrapper"
          ) &&
          elemBelow.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("dnd_copy-ManyToOne_dragPlacePicture") &&
          !elemBelow.parentElement.parentElement.classList.contains(
            "dnd_copy-ManyToOne_dragPlaceWrapper"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("buttonPlayPausePlayPause_wrap") &&
          elemBelow.parentElement.parentElement.classList.contains(
            "dnd_copy-ManyToOne_dropPlacePart"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else if (
          elemBelow.classList.contains("dnd_copy-ManyToOne_dragTitle") &&
          elemBelow.parentElement.parentElement.classList.contains(
            "dnd_copy-ManyToOne_dropPlacePart"
          ) &&
          elemBelow.parentElement.parentElement.children.length < maxQuantity
        ) {
          dropAppend(elemBelow.parentElement.parentElement, draggingItem);
        } else {
          draggingItem.remove();
        }
      }
      taskWrapper.removeEventListener("pointerup", onpointerup);
    }
  }
}
