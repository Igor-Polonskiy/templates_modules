import {
  scaleImage,
  dropAppend,
  resetSound,
  onSoundIconClick,
  checkingAnswerReset,
  checkingAnswerNegative,
  checkingAnswerPositive,
  shuffleCards,
  addRightChoiceClass,
  addWrongChoiceClass,
  toggleOpacityAndEventsElement,
  renderCheckPanel,
  getCheckPanelElements,
} from "../../../_common_files/common_scripts.js";

export function renderDndCopyOneToOneMarkup(
  arrayOfDropElements,
  arrayOfDragElements,
  taskId,
  rightCount
) {
  let draggingItem;
  let elemBelow;
  let isGameStart = false;
  const dropId = "drop";
  const dragId = "drag";
  const soundDataAttribute = "drop-data";
  let soundSetStates = {
    currentAudio: null,
    currentAudioIcon: null,
    isPlaying: false,
  };
  const taskWrapper =document.getElementById(`${taskId}`)

  const dropBox = taskWrapper.querySelector(
    ".dnd_copy-OneToOne_dropPlaceWrapper"
  );
  const dragBox = taskWrapper.querySelector(
    ".dnd_copy-OneToOne_dragPlaceWrapper"
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

  const audioFiles = taskWrapper.querySelectorAll(".dnd_copy-OneToOne_audio");

  // закрываем кнопку ПРОВЕРИТЬ
  toggleOpacityAndEventsElement(btnTest);

  taskWrapper.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);
  dropBox.addEventListener("pointerdown", onDropBoxClick);

  taskWrapper.addEventListener("click", onIconClick);

  function onIconClick(e) {
    if (e.target.classList.contains("buttonPlayPausePlayPause_wrap")) {
      onSoundIconClick(e, soundSetStates, audioFiles, soundDataAttribute);
    }
  }

  function onDropBoxClick(event) {
    if (
      event.target.classList.contains("dnd_copy-OneToOne_dropPicture") ||
      event.target.classList.contains("dnd_copy-OneToOne_dropPlace_box")
    ) {
      scaleImage(event.target);
    }
  }

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      if (item.children[1].children.length === 2) {
        item.children[1].removeChild(item.children[1].children[1]);
      }
    });
    resetSound(soundSetStates);
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
          item.children[1].children[1]?.attributes.getNamedItem("drag-data")
            .value
        ) {
          winVar += 1;
          addRightChoiceClass(item.children[1].children[1]);
        } else {
          addWrongChoiceClass(item.children[1].children[1]);
        }
      }
    });

    if (winVar === rightCount) {
      checkingAnswerPositive(controlsBox, infoBox);
    } else {
      checkingAnswerNegative(controlsBox, infoBox);
    }

    taskWrapper.removeEventListener("pointerdown", mouseDown);
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (
      event.target.classList.contains("dnd_copy-OneToOne_dragPicture") ||
      event.target.classList.contains("dnd_copy-OneToOne_dragTitle")
    ) {
      draggingItem = event.target.parentElement;
    } else if (
      event.target.classList.contains("dnd_copy-OneToOne_dragPicture_box")
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

    if (!draggingItem.classList.contains("dnd_copy-OneToOne_clone")) {
      draggingItem = draggingItem.cloneNode(true);
      draggingItem.classList.add("dnd_copy-OneToOne_clone");
    }
    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    let clickWithoutMove = true;

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

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);

      if (
        elemUnderPount === null ||
        (elemUnderPount !== draggingItem &&
          !elemUnderPount.classList.contains(
            "dnd_copy-OneToOne_dragPicture_box"
          ) &&
          !elemUnderPount.classList.contains("dnd_copy-OneToOne_dragPicture") &&
          !elemUnderPount.classList.contains("dnd_copy-OneToOne_dragTitle") &&
          !elemUnderPount.classList.contains(
            "dnd_copy-OneToOne_dropPlace_imageBox"
          ))
      ) {
        draggingItem.remove();
      }

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }

    taskWrapper.addEventListener("pointerup", onpointerup);

    function onpointerup(event) {
      if (clickWithoutMove) {
        if (
          event.target.classList.contains(
            "dnd_copy-OneToOne_dragPicture_box"
          ) &&
          event.target.firstElementChild.classList.contains(
            "dnd_copy-OneToOne_dragPicture"
          )
        ) {
          setTimeout(() => scaleImage(event.target.firstElementChild), 0);
        } else if (
          event.target.classList.contains("dnd_copy-OneToOne_dragPicture")
        ) {
          setTimeout(() => scaleImage(event.target), 0);
        }
        draggingItem.remove();
        taskWrapper.removeEventListener("pointerup", onpointerup);
      }

      if (draggingItem) draggingItem.style.cursor = "grab";
      document.removeEventListener("pointermove", onMouseMove);

      if (elemBelow) {
        if (
          elemBelow.classList.contains(
            "dnd_copy-OneToOne_dropPlace_imageBox"
          ) &&
          elemBelow.parentElement.children.length < 2
        ) {
          dropAppend(elemBelow.parentElement, draggingItem);
          draggingItem.classList.remove("dnd_copy-OneToOne_dnd-check");
          // открываем кнопку ПРОВЕРИТЬ
          if (!isGameStart) {
            toggleOpacityAndEventsElement(btnTest);
            isGameStart = true;
          }
        } else {
          draggingItem.remove();
        }
      }

      taskWrapper.removeEventListener("pointerup", onpointerup);
    }
  }

  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        const isTitle =
          picture.title &&
          `<div class='dnd_copy-OneToOne_dropTitle'>${picture.title}</div>`;

        const isSound =
          picture.audioSrc &&
          `<div class='dnd_copy-OneToOne_soundBox'>
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dropId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_copy-OneToOne_audio" id="${dropId}_${picture.id}${taskId}" imgSrc="${picture.audioSrc}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            </div>`;

        const isImage =
          picture.imgSrc &&
          `<div class="dnd_copy-OneToOne_dropPicture" style="background-image: url(${picture.imgSrc}" draggable="false">
                    </div>`;

        const isBackgroundImage = picture.bgSrc
          ? `<div drop-data="${picture.answerTag}" class="dnd_copy-OneToOne_dropPlace_box dnd_copy-OneToOne_border" style='background-image: url(${picture.bgSrc})'>
             </div>`
          : `<div drop-data="${picture.answerTag}" class="dnd_copy-OneToOne_dropPlace_box">
                    <div drop-data="${picture.answerTag}" class="dnd_copy-OneToOne_dropPlace_imageBox"></div>
             </div>`;

        return `<div class="dnd_copy-OneToOne_dropPlace">
                    <div class="dnd_copy-OneToOne_dropPicture_box">
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
          picture.titleTwo &&
          `<div class='dnd_copy-OneToOne_dragTitle'>${picture.titleTwo}</div>`;

        const isImage =
          picture.imgSrc_2 &&
          `<div class="dnd_copy-OneToOne_dragPicture" style="background-image: url(${picture.imgSrc_2}" draggable="false">
                    </div>`;

        const isSound =
          picture.audioSrcTwo &&
          `
                <div class="buttonPlayPausePlayPause_wrap buttonPlayPause--play" ${soundDataAttribute}="${dragId}_${picture.id}${taskId}">
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--one"></div>
                    <div class="buttonPlayPause__shape buttonPlayPause__shape--two"></div>
                    <audio class="dnd_copy-OneToOne_audio" id="${dragId}_${picture.id}${taskId}" src="${picture.audioSrcTwo}">
                              Your browser does not support the
                              <code>audio</code> element.
                    </audio>
                </div>
            `;

        return `<div class="dnd_copy-OneToOne_dragPicture_box" draggable="false" drag-data="${picture.answerTag}" sound-data="${picture.id}">
                    ${isImage}
                    ${isSound}
                    ${isTitle}
                </div>

                                  `;
      })
      .join("");
  }
}
